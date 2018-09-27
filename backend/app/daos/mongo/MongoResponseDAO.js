const GenericDAO = require("./GenericDAO");

class MongoResponseDAO extends GenericDAO {

    async createResponse(surveyId, response) {
        await this.collection().insertOne(
            {
                surveyId: surveyId,
                response: response
            }
        );
    }

}

module.exports = new MongoResponseDAO("responses");