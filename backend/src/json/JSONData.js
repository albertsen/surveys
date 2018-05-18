const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const log = require('../log');
const validators = require ('./validators');

class JSONData {

    constructor(type, data = null) {
        if (!type) throw "JSON data type cannot be undefined";
        this.type = type;
        this.validator = validators[type];
        if (!this.validator) throw "No validator for JSON type " + type;
        this.data = data;
    }

    validate() {
        this.validationResult = this.validator.validate(this.data)
    }

    set data(data) {
        if (typeof data == 'string') {
            data = JSON.parse(data);
        }
        this._data = data;
        this.validate();
    }

    get data() {
        return this._data;
    }

    isValid() {
        return this.validationResult && this.validationResult.valid;
    }

    writeToFile(file) {
        if (!file) throw "Name of file to write JSON to cannot be emoty";
        if (!this.data) throw "Refuse write empty JSON data to file: " + file;
        if (!this.isValid) throw "JSON to be written to file [" + file + "] is not valid: "+ this.validationResult.errorsText();
        let dir = path.dirname(file);
        mkdirp.sync(dir);
        fs.writeFileSync(file, JSON.stringify(this.data), 'UTF-8');
        return this.data;
    }

    loadFromFile(file) {
        if (!file) throw "JSON file name to be laoded cannot be null"
        this.data = fs.readFileSync(file, 'UTF-8');
        if (!this.isValid) throw "JSON to be written to file [" + file + "] is not valid: "+ this.validationResult.errorsText();
        return this.data;
    }
}

module.exports = JSONData;