const ValidationError = require('./services/ValidationError');

module.exports = {

    sendStatus: function (res, status, body) {
        res.status(status);
        if (body) res.json(body);
        res.send();
    },

    sendError: function (res, message, status = 500, code = "ERROR", additionalAttributes = {}) {
        let body = Object.assign({
            status: status,
            errorCode: code,
            message: message
        }, additionalAttributes);
        this.sendStatus(res, status, body);
    },

    handleError: function(res, error) {
        if (error instanceof ValidationError) {
            this.sendError(
                res, 
                "Your input is not valid.", 
                422, 
                "VALIDATION_ERROR",
                { validationErrors: error.errors }
            );
            }
        else {
            this.sendError(res, error);
        }
    }
}