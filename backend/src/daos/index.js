const config = require("../config");
const daos = require("./" + config.storage.type);

module.exports = daos;