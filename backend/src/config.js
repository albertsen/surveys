const path = require('path');

const config = {
    dirs: {
        data: path.normalize(__dirname + "/../data"),
        surveys: path.normalize(__dirname + "/../data/surveys"),
        responses: path.normalize(__dirname + "/../data/responses")
    }
}

module.exports = config;