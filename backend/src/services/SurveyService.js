const glob = require('glob');
const path = require('path');
const fs = require('fs');
const dateFormat = require('dateformat');
const uuid = require('uuid/v4');
const log = require('../log');
const config = require('../config');
const JSONData = require('../json/JSONData');

class SurveyService {

    _fileNameForSurvey(id) {
        return path.normalize(config.dirs.surveys + "/" + id + ".json");
    }

    saveSurvey(id, survey) {
        return new Promise((resolve, reject) => {
            try {
                if (!id) return reject("No ID given for new survey");
                if (!survey) return reject ("No survey given to create");
                if (id != survey.id) return reject("ID of survey document doesn't match given ID");
                let file = this._fileNameForSurvey(id);
                new JSONData(survey).writeToFile(file);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    createSurvey(id, survey) {
        return this.saveSurvey(id, survey);
    }

    getSurvey(id) {
        return new Promise((resolve, reject) => {
            let file = this._fileNameForSurvey(id);
            try {
                let survey = new JSONData('survey').loadFromFile(file);
                resolve(survey);
            }
            catch (err) {
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