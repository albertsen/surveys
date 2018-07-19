const surveyService = require("./SurveyService");
const responseValidationService = require("./ResponseValidationService")
const ValidationError = require('../errors/ValidationError');
const dao = require("../daos").response;

class ResponseService {
    
    async saveResponses(surveyId, response) {
        if (!surveyId) throw new Error("Survey ID cannot be null");
        let survey = await surveyService.getSurvey(surveyId)
        let validationErrors = responseValidationService.validate(survey, response);
        if (validationErrors) throw new ValidationError(validationErrors);
        return dao.createResponse(surveyId, response);
    }
}

module.exports = new ResponseService();