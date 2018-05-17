const JSONValidator = require('./JSONValidator');

module.exports = {
    ec: new JSONValidator('ec'),
    reponse: new JSONValidator('response')
}