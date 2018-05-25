class ValidationResult {

    constructor() {
        this.errors = [];
    }

    isValid() {
        return this.errors.length == 0;
    }
}

module.exports = ValidationResult