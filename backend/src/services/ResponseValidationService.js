const log = require('../log');
const ValidationResult = require("./ValidationResult");

const validators = {

    rules: {

        presence: (value, rule, errors) => {
            if (rule.mandatory && !value) {
                errors.push(rule.message || "Value is mandatory.");
            }
        },

        length: (value, rule, errors) => {
            if (!value) return;
            if (rule.min) {
                let minLength = rule.min.value;
                if (minLength > 0 && value.length < minLength) {
                    errors.push(rule.min.message || "Value must be at least " + minLength + " characters long.");
                }
            }
            if (rule.max) {
                let maxLength = rule.max.value;
                if (maxLength > 0 && value.length > maxLength) {
                    errors.push(rule.max.message || "Value cannot be longer than " + maxLength + " characters.");
                }
            }        
        }
    
    },

    types: {

        selection: (value, question, errors) => {
            if (value && !Object.keys(question.options).includes(value)) {
                errors.push("Invalid selection: " + value);
            }
        },        

        rating: (value, question, errors) => {
            if (value && !question.range.includes(value)) {
                errors.push("Selected value not in range: " + value);
            }
        }
    }

}

class ResponseValidationService {

    validate(survey, responses) {
        let errors =  survey.questions.reduce((allErrors, q) => {
            let valueErrors = [];
            let value = responses[q.id];
            let validator = validators.types[q.type];
            if (validator) {
                validator(value, q, valueErrors);
            }
            if (q.validations) {
                Object.entries(q.validations).forEach(([ruleKey, rule]) => {
                    let validator = validators.rules[ruleKey];
                    if (!validator) throw "Invalid validator: " + ruleKey;
                    validator(value, rule, valueErrors);
                })
            }
            if (valueErrors.length > 0) {
                let e =  {
                    questionId: q.id,
                    errors: valueErrors
                };
                allErrors.push(e);    
            }
            return allErrors;
        }, []);
        return new ValidationResult(errors);
    }

}

module.exports = new ResponseValidationService();