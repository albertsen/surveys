const express = require("express")
const cors = require("cors")
const surveyService = require("./services/SurveyService");
const responseService = require("./services/ResponseService");
const jsonValidators = require("./json/validators");
const log = require("./log");
const config = require("./config");
const bodyParser = require("body-parser");
const handleError = require("./handleError");
const asyncHandler = require('express-async-handler')

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

app.get("/surveys/:id", asyncHandler(async (req, res, next) => {
    let id = req.params["id"];
    let survey = await surveyService.getSurvey(id);
    res.json(survey);
}));

app.get("/surveys", asyncHandler(async (req, res, next) => {
    let surveys = await surveyService.getSurveys();
    res.json(surveys);
}));

app.put("/surveys/:id",
    validateJSONRequest("survey"),
    asyncHandler(async (req, res) => {
        let id = req.params["id"];
        await surveyService.createSurvey(id, req.body)
        res.sendStatus(201);
    })
);

app.post("/responses", 
    validateJSONRequest("response"),
    asyncHandler(async (req, res) => {
        await responseService.saveResponses(req.body);
        res.sendStatus(201);
    })
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