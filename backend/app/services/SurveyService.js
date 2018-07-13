const NotFoundError = require("../errors/NotFoundError");
const daos = require("../daos");

class SurveyService {

    async saveSurvey(id, survey) {
        if (!id) throw new Error("No ID given for new survey");
        if (!survey) throw new Error ("No survey given to create");
        if (id != survey.id) throw new Error("ID of survey document doesn't match given ID");
        daos.survey.createOrUpdateSurvey(id, survey);
    }

    async getSurvey(id) {
        let survey = await daos.survey.findSurveyById(id);
        if (!survey) {
            throw new NotFoundError("No survey found with ID: " + id);
        }
        return survey;
    }

    async getSurveys() {
        return daos.survey.findSurveySummaries();
    }

}

module.exports = new SurveyService();