const GenericDAO = require("./GenericDAO");

class MongoResponseDAO extends GenericDAO {

    async createResponse(surveyId, response) {
        return await this.collection().insertOne({
            surveyId: surveyId,
            response: response
        });
    }

    async findResponsesForSurvey(surveyId) {
        return await this.collection().find( { surveyId: surveyId }).toArray();
    }

}

module.exports = new MongoResponseDAO("responses");