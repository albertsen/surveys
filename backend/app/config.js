const path = require('path');

const environments = {
    local: {
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
    },
    dev: {
        storage: {
            type: "mongo",
            config: {
                url: "mongodb://localhost:27017",
                dbName: "survey"
            }
        }
    }
}



module.exports = environments[process.env["NODE_ENV"] || "dev"];