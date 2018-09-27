const config = require("../../config");
const mkdirp = require("mkdirp");
const log = require("../../log");

Object.values(config.storage.config.dirs).forEach(d => {
    if (mkdirp.sync(d)) {
        log.info("Created dir: " + d);
    }
});

module.exports = {
    response: require("./FileResponseDAO"),
    survey: require("./FileSurveyDAO")
}