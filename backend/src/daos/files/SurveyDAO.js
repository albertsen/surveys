const glob = require("glob-promise");
const path = require("path");
const fs = require("fs");
const config = require("../../config");
const jsonStorageService = require("../../services/JSONStorageService");

class SurveyDAO {
    
    _fileNameForSurvey(id) {
        return path.normalize(config.dirs.surveys + "/" + id + ".json");
    }

    async createOrUpdateSurvey(id, survey) {
        let file = this._fileNameForSurvey(id);
        return jsonStorageService.write(survey, file);
    }

    async findSurveyById(id) {
        let file = this._fileNameForSurvey(id);
        try {
            return await jsonStorageService.read(file);
        }
        catch (err) {
            if (err.code == 'ENOENT') return null;
            else throw err;
        }
    }

    async findSurveySummaries() {
        let files = await glob(config.dirs.surveys + "/*.json");
        let surveys = await Promise.all(files.map(async (f) => {
            let survey = await jsonStorageService.read(f);
            return {
                id: survey.id,
                title: survey.title
            }
        }));
        return surveys;
    }

}

module.exports = new SurveyDAO();