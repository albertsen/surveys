const express = require("express")
const cors = require("cors")
const surveyService = require("./services/SurveyService");
const responseService = require("./services/ResponseService");
const jsonValidators = require("./json/validators");
const log = require("./log");
const config = require("./config");
const bodyParser = require("body-parser");
const handleError = require("./handleError")

const app = express();
app.use(bodyParser.json())
app.use(cors());

function validateJSONRequest(schema) {
    var validator = jsonValidators[schema];
    if (!validator) throw new Error("Unknown schema " + schema);
    return function(req, res, next) {
       let json = req.body;
       let result = validator.validate(json);
       if (result.valid) next()
       else next(result.error);
    }
}

app.get("/surveys/:id", (req, res, next) => {
    let id = req.params["id"];
    surveyService.getSurvey(id)
        .then(survey => {
            res.json(survey);
        })
        .catch(err => next(err));
});

app.get("/surveys", (req, res, next) => {
    surveyService.getSurveys()
        .then(surveys => res.json(surveys))
        .catch(err => next(err));
    }
);

app.put("/surveys/:id",
    validateJSONRequest("survey"),
    function(req, res, next) {
        let id = req.params["id"];
        surveyService.createSurvey(id, req.body)
            .then(r => res.sendStatus(201))
            .catch(err => next(err));    
    }
);

app.post("/responses", 
    validateJSONRequest("response"),
    function(req, res, next) {
        responseService.saveResponses(req.body)
            .then(r => res.sendStatus(201))
            .catch(err => next(err));
    }
);

// Error handler
app.use(function (err, req, res, next) {
    if (err.stack) {
        log.error(err.stack);
    }
    else {
        log.error(err);
    }
    handleError(res, err);
});



app.listen(3000, () => log.info("Server listening on port 3000!"));