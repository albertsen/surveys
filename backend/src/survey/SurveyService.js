const glob = require('glob');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const dateFormat = require('dateformat');
const uuid = require('uuid/v4');
const log = require('../utils/log');
const Ajv = require('ajv');

class SurveyService {

    constructor() {
        this.datadir = path.normalize(__dirname + "/../../data");
        log.info("Data directory: " + this.datadir);
        this.surveydir = path.normalize(this.datadir + "/surveys");
        log.info("Survey directory: " + this.surveydir);
        mkdirp.sync(this.surveydir);
        this.responsedir = path.normalize(this.datadir + "/responses");
        log.info("Response directory: " + this.responsedir);
        mkdirp.sync(this.responsedir);
        this.jsonValidator = new Ajv();
        this.jsonValidator.addSchema(this._loadSchema(__dirname + "/../../schemas/survey.schema.json"), "survey");
        this.jsonValidator.addSchema(this._loadSchema(__dirname + "/../../schemas/responses.schema.json"), "responses");
    }

    _loadSchema(file) {
        let schemaFile = path.normalize(file);
        let data = fs.readFileSync(schemaFile);
        return JSON.parse(data);
    }

    getSurvey(id) {
        return new Promise((resolve, reject) => {
            if (!id) return reject("Survey ID cannot be null");
            let file = path.normalize(this.surveydir + "/" + id + ".json");
            fs.readFile(file, (err, data) => {
                if (err) return reject(err);
                try {
                    let survey = JSON.parse(data);
                    let valid = this.jsonValidator.validate("survey", survey);
                    if (!valid) {
                        log.error(this.jsonValidator.errors);
                        return reject(this.jsonValidator.errors);
                    }
                    resolve(JSON.parse(data))
                }
                catch (err) {
                    log.error(err);
                    return reject(err);
                }
            });
        })
    }

    getSurveys() {
        return new Promise((resolve, reject) => {
            glob(this.surveydir + "/*.json", (err, files) => {
                let surveys = [];
                for (let f of files) {
                    try {
                        let data = fs.readFileSync(f);
                        let survey = JSON.parse(data);
                        surveys.push(
                            { id: survey.id, title: survey.title }
                        );                     
                    }
                    catch (err) {
                        return reject(err);
                    }
                }
                resolve (surveys);
            });
        });
    }

    saveResponse(response) {
        return new Promise((resolve, reject) => {
            let surveyId = response.surveyId;
            let dir = path.normalize(this.responsedir + "/" + surveyId);
            mkdirp(dir, (err) => {
                if (err) return reject(err);
                let timestamp = dateFormat(new Date(), "yyyymmdd-HHMMss");
                let file = path.normalize(dir + "/" + timestamp + "-" + uuid() + ".json");
                log.debug("Saving result to: " + file);   
                fs.writeFile(file, JSON.stringify(response), 'UTF-8', function(err) {
                    if (err) return reject(err);
                    resolve(response);
                })
            });
        });
    }

}

module.exports = SurveyService;