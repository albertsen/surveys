const path = require("path");
const mkdirp = require("mkdirp");
const dateFormat = require("dateformat");
const uuid = require("uuid/v4");
const config = require("../config");
const log = require("../log");
const JSONData = require("../json/JSONData");
const surveyService = require("./SurveyService");
const responseValidationService = require("./ResponseValidationService")
const ValidationError = require('./ValidationError');

class ResponseService {
    
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
                        let validationErrors = responseValidationService.validate(survey, response.responses);
                        if (validationErrors) reject(new ValidationError(validationErrors));
                        let savedResponse = new JSONData(response).writeToFile(file);
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