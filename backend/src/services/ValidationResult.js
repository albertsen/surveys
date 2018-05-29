class ValidationResult {

    constructor() {
        this.errors = [];
    }

    addError(error) {
        this.errors.push(error);
    }

    isValid() {
        return this.errors.length == 0;
    }
}

module.exports = ValidationResult