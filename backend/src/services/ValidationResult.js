class ValidationResult {

    constructor(errors) {
        this.errors = errors;
    }

    isValid() {
        return !this.errors || this.errors.length == 0;
    }

}

module.exports = ValidationResult