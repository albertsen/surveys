const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const surveyService = require('./services/SurveyService');
const responseService = require('./services/ResponseService');
const log = require('./log');
const config = require('./config');
const handleError = require('./handleError')

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/surveys/:id', (req, res) => {
    let id = req.params['id'];
    surveyService.getSurvey(id)
        .then(survey => res.json(survey))
        .catch(err => handleError(res, err));
});

app.get('/surveys', (req, res) => {
    surveyService.getSurveys()
        .then(surveys => res.json(surveys))
        .catch(err => handleError(res, err));
});

app.put('/surveys/:id', (req, res) => {
    let id = req.params['id'];
    surveyService.createSurvey(id, req.body)
        .then(r => res.sendStatus(201))
        .catch(err => handleError(res, err));    
});

app.post('/responses', (req, res) => {
    responseService.saveResponses(req.body)
        .then(r => res.sendStatus(201))
        .catch(err => handleError(res, err));
});

app.listen(3000, () => log.info('Server listening on port 3000!'));