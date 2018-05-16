const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const surveyService = require('./survey');
const log = require('./utils/log');

const app = express();
app.use(bodyParser.json());    
app.use(cors());

function sendStatus(res, status, message) {
    res.status(status);
    res.json({ message: message });
}

function sendError(res, message) {
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
        .catch(e => console.log(e));
});

app.listen(3000, () => log.info('Server listening on port 3000!'));