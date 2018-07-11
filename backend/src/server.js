const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const surveyService = require('./services/SurveyService');
const responseService = require('./services/ResponseService');
const jsonValidators = require('./json/validators');
const log = require('./log');
const config = require('./config');
const ru = require('./responseUtils')

const app = express();
app.use(bodyParser.json());
app.use(cors());

function validateJSON(schema) {
    let validator = jsonValidators[schema];
    if (!validator) throw "Unknown schema " + schema;
    return function(req, res, next) {
        
    }
}

app.get('/surveys/:id', (req, res, next) => {
    let id = req.params['id'];
    surveyService.getSurvey(id)
        .then(survey => {
            res.json(survey);
            console.log("*** RES: " + res.body);
            next()
        })
        .catch(err => ru.handleError(res, err));
});

app.get('/surveys', (req, res) => {
    surveyService.getSurveys()
        .then(surveys => res.json(surveys))
        .catch(err => ru.handleError(res, err));
});

app.put('/surveys/:id', (req, res) => {
    let id = req.params['id'];
    surveyService.createSurvey(id, req.body)
        .then(r => res.sendStatus(201))
        .catch(err => ru.handleError(res, err));    
});

app.post('/responses', 
    validateJSON("response"),
    function(req, res) {
        responseService.saveResponses(req.body)
         .then(r => res.sendStatus(201))
         .catch(err => ru.handleError(res, err));
    }
);

app.listen(3000, () => log.info('Server listening on port 3000!'));