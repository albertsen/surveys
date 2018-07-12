const glob = require("glob-promise");
const path = require("path");
const fs = require("fs");
const dateFormat = require("dateformat");
const uuid = require("uuid/v4");
const log = require("../log");
const config = require("../config");
const JSONData = require("../json/JSONData");

class SurveyService {

    _fileNameForSurvey(id) {
        return path.normalize(config.dirs.surveys + "/" + id + ".json");
    }

    async saveSurvey(id, survey) {
        if (!id) throw new Error("No ID given for new survey");
        if (!survey) throw new Error ("No survey given to create");
        if (id != survey.id) throw new Error("ID of survey document doesn't match given ID");
        let file = this._fileNameForSurvey(id);
        return new JSONData(survey).writeToFile(file);
    }

    async createSurvey(id, survey) {
        return this.saveSurvey(id, survey);
    }

    async getSurvey(id) {
        let file = this._fileNameForSurvey(id);
        return new JSONData().loadFromFile(file);
    }

    async getSurveys() {
        let files = await glob(config.dirs.surveys + "/*.json");
        let surveys = await Promise.all(files.map(async (f) => {
            let survey = await new JSONData().loadFromFile(f);
            return {
                id: survey.id,
                title: survey.title
            }
        }));
        return surveys;
    }

}

module.exports = new SurveyService();