const db = require("./db")

class GenericDAO {

    constructor(collectionName) {
        this.collectionName = collectionName;
    }

    collection() {
        return db().collection(this.collectionName);
    }

}

module.exports = GenericDAO;