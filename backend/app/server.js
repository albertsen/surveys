const express = require("express")
const cors = require("cors")
const surveyService = require("./services/SurveyService");
const responseService = require("./services/ResponseService");
const jsonValidationService = require("./services/JSONValidationService");
const log = require("./log");
const bodyParser = require("body-parser");
const errorHandler = require("./errorHandler");
const asyncHandler = require('express-async-handler')

const app = express();
app.use(bodyParser.json())
app.use(cors());

function validateJSONRequest(schemaName) {
    return function(req, res, next) {
       let json = req.body;
       let result = jsonValidationService.validate(json, schemaName)
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
        await surveyService.saveSurvey(id, req.body)
        res.sendStatus(201);
    })
);

app.post("/surveys/:surveyId/responses", 
    validateJSONRequest("response"),
    asyncHandler(async (req, res) => {
        let surveyId = req.params["surveyId"];
        await responseService.saveResponses(surveyId, req.body);
        res.sendStatus(201);
    })
);

// Error handler
app.use(function (err, req, res, next) {
    errorHandler(res, err);
});



app.listen(3000, () => log.info("Server listening on port 3000!"));