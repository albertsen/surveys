const NotFoundError = require("../errors/NotFoundError");
const dao = require("../daos").survey;

class SurveyService {

    async saveSurvey(id, survey) {
        if (!id) throw new Error("No ID given for new survey");
        if (!survey) throw new Error ("No survey given to create");
        if (id != survey.id) throw new Error("ID of survey document doesn't match given ID");
        dao.createOrUpdateSurvey(id, survey);
    }

    async getSurvey(id) {
        let survey = await dao.findSurveyById(id);
        if (!survey) {
            throw new NotFoundError("No survey found with ID: " + id);
        }
        return survey;
    }

    async getSurveys() {
        return dao.findSurveySummaries();
    }

}

module.exports = new SurveyService();