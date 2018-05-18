const JSONValidator = require('./JSONValidator');

module.exports = {
    survey: new JSONValidator('survey'),
    response: new JSONValidator('response')
}