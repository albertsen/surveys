const path = require('path');
const mkdirp = require('mkdirp');
const dateFormat = require('dateformat');
const uuid = require('uuid/v4');
const config = require('../config');
const log = require('../log');
const JSONData = require('../json/JSONData');
const surveyService = require('./SurveyService');
const ValidationResult = require('./ValidationResult')

class ResponseService {

    _validateResponse(survey, responses) {
        let result = new ValidationResult();
        survey.questions.forEach((q) => {
            let value = responses[q.id];
            let error = validators.common(q, value);
            if (error) {
                result.errors.push( { id: q.id, error: error } );
            }
            else {
                let validator = validators[q.type];
                if (!validator) {
                    log.warn('No validator found for question of type ' + q.type);
                }
                error = validator(q, value);
                if (error) {
                    result.errors.push({ id: q.id, error: error });
                }
            }
        });
        return result;
    }
    
    saveResponses(response) {
        return new Promise((resolve, reject) => {
            try {
                let surveyId = response.surveyId;
                if (!surveyId) return reject("Response doens't have a survey ID");
                surveyService.getSurvey(surveyId)
                    .then((survey) => {
                        let dir = path.normalize(config.dirs.responses + "/" + surveyId);
                        mkdirp.sync(dir);
                        let timestamp = dateFormat(new Date(), "yyyymmdd-HHMMss");
                        let file = path.normalize(dir + "/" + timestamp + "-" + uuid() + ".json");
                        let validationResult = this._validateResponse(survey, response.responses);
                        if (!validationResult.isValid()) return reject(validationResult);
                        let savedResponse = new JSONData('response', response).writeToFile(file);
                        resolve(savedResponse);
                    })
                    .catch((err) => reject(err))
            }
            catch(err) {
                reject(err);
            }
        });
    }
}

module.exports = new ResponseService();