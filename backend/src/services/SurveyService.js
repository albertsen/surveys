const glob = require('glob');
const path = require('path');
const fs = require('fs');
const dateFormat = require('dateformat');
const uuid = require('uuid/v4');
const log = require('../log');
const config = require('../config');
const JSONData = require('../json/JSONData');

class SurveyService {

    getSurvey(id) {
        return new Promise((resolve, reject) => {
            let file = path.normalize(config.dirs.surveys + "/" + id + ".json");
            try {
                let survey = new JSONData('survey').loadFromFile(file);
                resolve(survey);
            }
            catch {
                reject(err);
            }
        })
    }

    getSurveys() {
        return new Promise((resolve, reject) => {
            glob(config.dirs.surveys + "/*.json", (err, files) => {
                if (err) return reject(err);
                try {
                    let surveyList = files.map((f) => {
                        let survey = new JSONData('survey').loadFromFile(f);
                        return {
                            id: survey.id,
                            title: survey.title
                        }
                    });
                    resolve(surveyList);
                }
                catch (err) {
                    reject(err);
                }
            });
        })
    }

}

module.exports = new SurveyService();