const path = require('path');
const dateFormat = require('dateformat');
const uuid = require('uuid/v4');
const log = require('../utils/log');
const JSONData = require('../json/JSONData');


class ResponseService {

    saveResponse(response) {
        return new Promise((resolve, reject) => {
                try {
                    let jsonData = new JSONData(response);
                    let surveyId = response.surveyId;
                    let dir = path.normalize(this.responsedir + "/" + surveyId);
                    mkdirp(dir, (err) => {
                        if (err) return reject(err);
                        let timestamp = dateFormat(new Date(), "yyyymmdd-HHMMss");
                        let file = path.normalize(dir + "/" + timestamp + "-" + uuid() + ".json");
                        log.debug("Saving result to: " + file);
                        jsonData.writeToFile(file)
                            .then((data) => resolve(data))
                            .error((err) => reject(err))
                    });

                }
            };
        }

    }

    module.exports = SurveyService;