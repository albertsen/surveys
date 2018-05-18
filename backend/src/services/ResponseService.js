const path = require('path');
const dateFormat = require('dateformat');
const uuid = require('uuid/v4');
const JSONData = require('../json/JSONData');


class ResponseService {

    saveResponse(response) {
        let timestamp = dateFormat(new Date(), "yyyymmdd-HHMMss");
        let file = path.normalize(dir + "/" + timestamp + "-" + uuid() + ".json");
        return new JSONData(response).writeToFile(file);
    }
}

module.exports = new ResponseService();