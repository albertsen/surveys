const GenericDAO = require("./GenericDAO");

class MongoSurveyDAO extends GenericDAO {
    
    async createOrUpdateSurvey(id, survey) {
        return await this.collection().updateOne( { _id: id }, { $set: survey }, { upsert: true });
    }

    async findSurveyById(id) {
        return await this.collection().findOne({ _id: id });
    }

    async findSurveySummaries() {
        return await this.collection().find({ }).project({ title: true }).toArray();
    }

}

module.exports = new MongoSurveyDAO("surveys");