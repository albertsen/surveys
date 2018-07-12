const ValidationError = require("./errors/ValidationError");
const NotFoundError = require("./errors/NotFoundError");
const JSONValidationError = require("./json/JSONValidationError");


const errorMappings = (function(mappings) {
    mappings[ValidationError] = {
        status: 422,
        errorCode: "VALIDATION_ERROR",
        message: "Your input is not valid",
        detailsAttribute: "errors" 
    };
    mappings[JSONValidationError] = {
        status: 400,
        errorCode: "JSON_VALIDATION_ERROR",
        message: "Invalid JSON document",
        detailsAttribute: "errors"
    }
    mappings[NotFoundError] = {
        status: 404,
        errorCode: "NOT_FOUND",
        message: "The requested resource does not exist"
    }
    return mappings;
})({});



function sendStatus(res, status, body) {
    res.status(status);
    if (body) res.json(body);
    res.send();
};

function sendError(res, message, status = 500, code = "ERROR", details = null) {
    let body = {
        status: status,
        errorCode: code,
        message: message
    };
    if (details) {
        body.details = details;
    }
    sendStatus(res, status, body);
};

function handleError(res, error) {
    let errorMapping = errorMappings[error.constructor];
    if (errorMapping) {
        sendError(
            res,
            errorMapping.message,
            errorMapping.status,
            errorMapping.errorCode,
            error[errorMapping.detailsAttribute]
        )
    }
    else if (error.message) {
        sendError(res, error.message);
    }
    else {
        sendError(res, JSON.stringify(error));
    }
};

module.exports = handleError;