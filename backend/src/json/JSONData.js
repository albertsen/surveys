const util = require("util");
const path = require("path");
const mkdirp = util.promisify(require("mkdirp"));
const NotFoundError = require("../errors/NotFoundError");
const fs = require("fs");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class JSONData {

    constructor(data = null) {
        this._data = data;
    }

    set data(data) {
        if (typeof data == "string") {
            data = JSON.parse(data);
        }
        this._data = data;
    }

    get data() {
        return this._data;
    }


    async writeToFile(file) {
        if (!file) throw new Error("Name of file to write JSON to cannot be empty");
        if (!this.data) throw new Error("Refuse to write empty JSON data to file: " + file);
        let dir = path.dirname(file);
        await mkdirp(dir);
        await writeFile(file, JSON.stringify(this.data), "UTF-8");
    }

    async loadFromFile(file) {
        if (!file) throw new Error("JSON file name to be loaded cannot be null");
        try {
            var content = await readFile(file, "UTF-8");
        }
        catch (err) {
            if (err.code == 'ENOENT') throw new NotFoundError("File does not exist: " + file);
            else throw err;
        }
        this.data = JSON.parse(content);
        return this.data;
    }
}

module.exports = JSONData;