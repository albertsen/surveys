const path = require("path");
const mkdirp = require("mkdirp");
const dateFormat = require("dateformat");
const uuid = require("uuid/v4");
const config = require("../../config");
const jsonStorageService = require("../../services/JSONStorageService");

class ResponseDAO {

    async createResponse(surveyId, response) {
        let dir = path.normalize(config.dirs.responses + "/" + surveyId);
        await mkdirp(dir);
        let timestamp = dateFormat(new Date(), "yyyymmdd-HHMMss");
        let file = path.normalize(dir + "/" + timestamp + "-" + uuid() + ".json");
        return await jsonStorageService.write(response, file);
    }

}

module.exports = new ResponseDAO();