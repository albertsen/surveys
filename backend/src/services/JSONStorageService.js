const util = require("util");
const path = require("path");
const mkdirp = util.promisify(require("mkdirp"));
const NotFoundError = require("../errors/NotFoundError");
const fs = require("fs");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class JSONStorageService {

    async write(data, file) {
        if (!file) throw new Error("Name of file to write JSON to cannot be empty");
        if (!data) throw new Error("Refuse to write empty JSON data to file: " + file);
        let dir = path.dirname(file);
        await mkdirp(dir);
        await writeFile(file, JSON.stringify(data), "UTF-8");
    }

    async read(file) {
        if (!file) throw new Error("JSON file name to be loaded cannot be null");
        var content = await readFile(file, "UTF-8");
        return JSON.parse(content);
    }
}

module.exports = new JSONStorageService();