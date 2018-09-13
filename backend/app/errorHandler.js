const ValidationError = require("./errors/ValidationError");
const NotFoundError = require("./errors/NotFoundError");
const JSONValidationError = require("./errors/JSONValidationError");
const log = require("./log");


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

function errorHandler(err, req, res, next) {
    if (err.stack) {
        log.error(err.stack);
    }
    else {
        log.error(err);
    }
    let errorMapping = errorMappings[err.constructor];
    if (errorMapping) {
        sendError(
            res,
            errorMapping.message,
            errorMapping.status,
            errorMapping.errorCode,
            err[errorMapping.detailsAttribute]
        )
    }
    else if (err.message) {
        sendError(res, err.message);
    }
    else {
        sendError(res, JSON.stringify(err));
    }
};

module.exports = errorHandler;