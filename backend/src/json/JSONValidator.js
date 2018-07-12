const path = require("path");
const JSONValidationError = require("./JSONValidationError")
const ajv = new require("ajv")();

class JSONValidator {

    constructor(schemaName) {
        this.schemaName = schemaName;
        let schemaFile = path.normalize(__dirname + "/schemas/" + schemaName + ".schema.json");
        ajv.addSchema(require(schemaFile), schemaName);
    }

    validate(json) {
        if (!json) throw new Error("No JSON data");
        if (typeof json == 'string') {
            json = JSON.parse(json);
        }
        let valid = ajv.validate(this.schemaName, json);
        return {
            valid: valid,
            error: new JSONValidationError(ajv),
        }
    }
}

module.exports = JSONValidator