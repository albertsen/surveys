const ValidationResult = require('./services/ValidationResult');
const log = require('./log');

module.exports = {

    sendStatus: function (res, status, body) {
        res.status(status);
        if (body) res.json(body);
    },

    sendError: function (res, message, status = 500, code = "ERROR", additionalAttributes = {}) {
        let body = Object.assign({
            status: status,
            errorCode: code,
            message: message
        }, additionalAttributes);
        log.error(body);
        sendStatus(res, status, body);
    },

    handleError: function(res, error) {
        if (error instanceof ValidationResult) {
            this.sendError(
                res, 
                "Your input is not valid.", 
                422, 
                "VALIDATION_ERROR",
                { validationErrors: validationResult.errors }
            );
            }
        else {
            sendError(res, error);
        }
    }
}