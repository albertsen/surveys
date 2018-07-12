const path = require("path");
const mkdirp = require("mkdirp");
const dateFormat = require("dateformat");
const uuid = require("uuid/v4");
const config = require("../config");
const log = require("../log");
const JSONData = require("../json/JSONData");
const surveyService = require("./SurveyService");
const responseValidationService = require("./ResponseValidationService")
const ValidationError = require('../errors/ValidationError');

class ResponseService {
    
    async saveResponses(response) {
        let surveyId = response.surveyId;
        if (!surveyId) throw new Error("Response doens't have a survey ID");
        let survey = await surveyService.getSurvey(surveyId)
        let dir = path.normalize(config.dirs.responses + "/" + surveyId);
        mkdirp.sync(dir);
        let timestamp = dateFormat(new Date(), "yyyymmdd-HHMMss");
        let file = path.normalize(dir + "/" + timestamp + "-" + uuid() + ".json");
        let validationErrors = responseValidationService.validate(survey, response.responses);
        if (validationErrors) throw new ValidationError(validationErrors);
        return await new JSONData(response).writeToFile(file);
    }
}

module.exports = new ResponseService();