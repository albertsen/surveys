const path = require('path');
const ajv = new require('ajv')();

class JSONValidator {

    constructor(schemaName) {
        this.schemaName = schemaName;
        let schemaFile = path.normalize(__dirname + "/schemas/" + schemaName + "schema.json");
        ajv.addSchema(require(schemaFile), schemaName);
    }

    validate(json) {
        if (json) {
            if (typeof json == 'string') {
                json = JSON.parse(json);
            }
            let valid = ajv.validate(this.schemaName, json);
            return {
                valid: valid,
                errors: ajv.errors,
                errorsText: () => ajv.errorsText()
            }
        }
        else {
            return {
                valid: false,
                errors: ["No JSON data"],
                errorsText: () => "No JSON data"
            }
        }
    }
}

module.exports = JSONValidator