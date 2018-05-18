const path = require('path');
const dateFormat = require('dateformat');
const uuid = require('uuid/v4');
const config = require('../config');
const JSONData = require('../json/JSONData');


class ResponseService {

    saveResponse(response) {
        return new Promise((resolve, reject) => {
            try {
                let timestamp = dateFormat(new Date(), "yyyymmdd-HHMMss");
                let file = path.normalize(config.dirs.responses + "/" + timestamp + "-" + uuid() + ".json");
                let savedResponse = new JSONData('response', response).writeToFile(file);
                resolve(savedResponse);
            }
            catch(err) {
                reject(err);
            }
        });
    }
}

module.exports = new ResponseService();