const path = require('path');
const mkdirp = require('mkdirp');
const log = require('./log');

const config = {
    storage: {
        type: "files",
        config: {
            dirs: {
                data: path.normalize(__dirname + "/../data"),
                surveys: path.normalize(__dirname + "/../data/surveys"),
                responses: path.normalize(__dirname + "/../data/responses")
            }        
        }
    }
}


module.exports = config;