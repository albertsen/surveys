const path = require('path');
const mkdirp = require('mkdirp');
const log = require('./log');

const config = {
    dirs: {
        data: path.normalize(__dirname + "/../data"),
        surveys: path.normalize(__dirname + "/../data/surveys"),
        responses: path.normalize(__dirname + "/../data/responses")
    }
}

Object.values(config.dirs).forEach(d => {
    if (mkdirp.sync(d)) {
        log.info("Created dir: " + d);
    }
});

module.exports = config;