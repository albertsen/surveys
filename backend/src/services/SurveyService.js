const glob = require('glob');
const path = require('path');
const fs = require('fs');
const dateFormat = require('dateformat');
const uuid = require('uuid/v4');
const log = require('../log');
const JSONData = require('../json/JSONData');

class SurveyService {

    getSurvey(id) {
        let file = path.normalize(this.surveydir + "/" + id + ".json");
        return new JSONData('survey').loadFromFile(file);
    }

    getSurveys() {
        return new Promise((resolve, reject) => {
            glob(this.surveydir + "/*.json", (err, files) => {
                let surveys = [];
                for (let f of files)  {
                    try {
                        let data = await new JSONData(f).loadFromFile();
                        surveys.push({
                            id: survey.id,
                            title: survey.title
                        });
                    } catch (err) {
                        return reject(err);
                    }
                }
                resolve(surveys);
            });
        });
    }

}

module.exports = SurveyService;