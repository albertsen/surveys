const fs = require('fs');
const validators = require ('./validators');

class JSONData {

    constructor(type, data = null) {
        if (!type) throw "JSON data type cannot be undefined";
        if (!data) throw "JSON data cannot be undefined";
        this.type = type;
        this.validator = validators[type];
        this.data = data;
    }

    validate() {
        if (!this.data) throw "Cannot validate undefied JSON data";
        this.validationResult = this.validator.validate(this.data);
    }

    set data(data) {
        if (data instanceof string) {
            data = JSON.parse(data);
        }
        this.data = data;
        this.validate();
    }

    isValid() {
        return this.validationResult.valid;
    }

    writeToFile(file) {
        if (!file) throw "Name of JSON file to be loaded cannot be null";
        if (!this.data) throw "No JSON data to write to file: " + file;
        return new Promise((resolve, reject) => {
            fs.writeFile(file, JSON.stringify(this.data), 'UTF-8', function (err) {
                if (err) reject(err);
                else resolve(response);
            });
       });
    }

    loadFromFile(file) {
        if (!file) throw "JSON file name to be laoded cannot be null"
        return new Promise((resolve, reject) => {
            fs.readFile(file, (err, data) => {
                if (err) return reject(err);
                try {
                    this.data = data;
                    if (this.isValid) resolve(ths.data)
                    else reject (this.validationResult.errorsText())
                } catch (err) {
                    log.error(err);
                    return reject(err);
                }
            });
        })
        
    }
}