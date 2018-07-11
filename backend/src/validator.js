const validators = require('./json/validators');

function validate(requestType, responseType) {
    if (requestType) {
        var requestValidator = validators[requestType];
        if (!requestValidator) throw "Invalid request schema type: " + requestType;
    }
    if (responseType) {
        var responseValidator = validators[responseType];
        if (!responseValidator) throw "Invalid response schema type: " + responseType;
    }
    return function(req, res, next) {
        
    }
}