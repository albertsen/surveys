const validators = {

    rules = {

        presence: (value, rule, result) => {
            if (rule.mandatory && !value) {
                result.addError(rule.message || "Value is mandatory.");
            }
        },

        length: (value, rule, result) => {
            if (rule.min) {
                let minLength = rule.min.value;
                if (minLength > 0 && value.length < minLength) {
                    result.err(rule.min.message || "Value must be at least " + minLength + " characters long.");
                }
            }
            if (rule.max) {
                let maxLength = rule.max.value;
                if (maxLength > 0 && value.length > maxLength) {
                    result.err(rule.max.message || "Value cannot be longer than " + maxLength + " characters.");
                }
            }        
        }
    
    },

    types = {

        range: (value, question, result) => {
            if (!question.range.includes(value)) {
                result.addError("Selected value not in range: " + value);
            }
        }
    }

}

class ResponseValidationService {

    validate(survey, responses) {

    }

}