const express = require('express')
const cors = require('cors')
const surveyService = require('./services/SurveyService');
const responseService = require('./services/ResponseService');
const jsonValidators = require('./json/validators');
const log = require('./log');
const config = require('./config');
const ru = require('./responseUtils');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json())
app.use(cors());

function validateJSONRequest(schema) {
    var validator = jsonValidators[schema];
    if (!validator) throw "Unknown schema " + schema;
    return function(req, res, next) {
       let json = req.body;
       let result = validator.validate(json);
       if (!result.valid) {
            ru.sendError(
                res, 
                "Invalid JSON document",
                400,
                "JSON_VALIDATION_ERROR",
                { validationErrors: result.errors }
            );
            return;
       }
       next();
    }
}

app.get('/surveys/:id', (req, res, next) => {
    let id = req.params['id'];
    surveyService.getSurvey(id)
        .then(survey => {
            res.json(survey);
        })
        .catch(err => next(err));
});

app.get('/surveys', (req, res, next) => {
    surveyService.getSurveys()
        .then(surveys => res.json(surveys))
        .catch(err => next(err));
    }
);

app.put('/surveys/:id',
    validateJSONRequest("survey"),
    function(req, res, next) {
        let id = req.params['id'];
        surveyService.createSurvey(id, req.body)
            .then(r => res.sendStatus(201))
            .catch(err => next(err));    
    }
);

app.post('/responses', 
    validateJSONRequest("response"),
    function(req, res, next) {
        responseService.saveResponses(req.body)
         .then(r => res.sendStatus(201))
         .catch(err => next(err));
    }
);

app.use(function (err, req, res, next) {
    if (err.stack) {
        log.error(err.stack);
    }
    else {
        log.error(err);
    }
    ru.handleError(res, err);
});



app.listen(3000, () => log.info('Server listening on port 3000!'));