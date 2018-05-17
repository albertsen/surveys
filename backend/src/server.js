const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const surveyService = require('./services');
const log = require('./utils/log');
const mkdirp = require('mkdirp');
const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(cors());

function sendStatus(res, status, message) {
    res.status(status);
    res.json({
        message: message
    });
}

function sendError(res, message) {
    log.error(message);
    sendStatus(res, 500, message);
}

app.get('/surveys/:id', (req, res) => {
    let id = req.params['id'];
    surveyService.getSurvey(id)
        .then((survey) => res.json(survey))
        .catch((err) => sendError(res, err));
});

app.get('/surveys', (req, res) => {
    surveyService.getSurveys()
        .then((surveys) => res.json(surveys))
        .catch((err) => sendError(res, err));
});

app.post('/responses', (req, res) => {
    surveyService.saveResponse(req.body)
        .then(r => res.sendStatus(200))
        .catch((err) => sendError(res, err));
});

Object.values(config.dir).forEach(d => {
    if (mkdirp.sync(d)) {
        log.info("Created dir: " + d);
    }
});

app.listen(3000, () => log.info('Server listening on port 3000!'));