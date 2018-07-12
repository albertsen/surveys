const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class JSONData {

    constructor(data = null) {
        this._data = data;
    }

    set data(data) {
        if (typeof data == 'string') {
            data = JSON.parse(data);
        }
        this._data = data;
    }

    get data() {
        return this._data;
    }


    writeToFile(file) {
        if (!file) throw new Error("Name of file to write JSON to cannot be empty");
        if (!this.data) throw new Error("Refuse to write empty JSON data to file: " + file);
        let dir = path.dirname(file);
        mkdirp.sync(dir);
        fs.writeFileSync(file, JSON.stringify(this.data), 'UTF-8');
        return this.data;
    }

    loadFromFile(file) {
        if (!file) throw new Error("JSON file name to be loaded cannot be null");
        this.data = fs.readFileSync(file, 'UTF-8');
        return this.data;
    }
}

module.exports = JSONData;