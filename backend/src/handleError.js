const ValidationResult = require('./services/ValidationResult');
const log = require('./log');

function sendStatus(res, status, body) {
    res.status(status);
    if (body) res.json(body);
}

function sendError(res, error) {
    let body = {
        status: 500,
        errorCode: 'ERROR',
        message: error
    }
    log.error(body);
    sendStatus(res, 500, body);
}

function sendValidationError(res, validationResult) {
    let body = {
        status: 422,
        errorCode: 'VALIDATION_ERROR',
        message: 'Your input is not valid.',
        validationErrors: validationResult.errors
    }
    sendStatus(res, 422, body);
}

function handleError(res, error) {
    if (error instanceof ValidationResult) {
        sendValidationError(res, error);
    }
    else {
        sendError(res, error);
    }
}

module.exports = handleError;