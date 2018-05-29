const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const surveyService = require('./surveys/SurveyService');
const surveyResponseService = require('./surveys/SurveyResponseService');
const ValidationResult = require('./validation/ValidationResult');
const log = require('./log');
const mkdirp = require('mkdirp');
const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(cors());

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

app.get('/surveys/:id', (req, res) => {
    let id = req.params['id'];
    surveyService.getSurvey(id)
        .then((survey) => res.json(survey))
        .catch((err) => handleError(res, err));
});

app.get('/surveys', (req, res) => {
    surveyService.getSurveys()
        .then((surveys) => res.json(surveys))
        .catch((err) => handleError(res, err));
});

app.put('/surveys/:id', (req, res) => {
    let id = req.params['id'];
    surveyService.createSurvey(id, req.body)
        .then(r => res.sendStatus(201))
        .catch((err) => handleError(res, err));    
});

app.post('/responses', (req, res) => {
    surveyResponseService.saveResponses(req.body)
        .then(r => res.sendStatus(201))
        .catch((err) => handleError(res, err));
});

Object.values(config.dirs).forEach(d => {
    if (mkdirp.sync(d)) {
        log.info("Created dir: " + d);
    }
});

app.listen(3000, () => log.info('Server listening on port 3000!'));