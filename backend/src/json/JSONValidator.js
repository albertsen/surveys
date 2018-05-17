const path = require('path');
const ajv = new require('ajv')();

class JSONValidator {

    constructor(schemaName) {
        let schemaFile = path.normalize(__dirname + "/schemas/" + schemaName + "json");
        ajv.addSchema(require(schemaFile), schema);
    }

    validate(json) {
        if (jsont instanceof string) {
            json = JSON.parse(json);
        }
        let valid = ajv.validate(json);
        return {
            valid: valid,
            errors: ajv.errors,
            errorsText: function () {
                return ajv.errorsText();
            }
        }
    }
}