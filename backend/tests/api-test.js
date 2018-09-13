const chakram = require('chakram');
const jobSurvey = require('./data/surveys/job.json');

expect = chakram.expect;

const url = 'http://localhost:3000'

describe("Survey API", function () {
    it("should create survey", () => {
        let response = chakram.put(url + "/surveys/job", jobSurvey);
        return expect(response).to.have.status(201);
    });
    it("should return a schema validation error", () => {
        let response = chakram.put(url + "/surveys/invalid", { "areYouInvalid": true });
         expect(response).to.have.status(400);
         expect(response).to.comprise.of.json({
            "status": 400,
            "errorCode": "JSON_VALIDATION_ERROR",
            "message": "Invalid JSON document"
        });
        return chakram.wait();
    });
    it("should return an overview list of surveys", () => {
        let response = chakram.get(url + "/surveys");
        expect(response).to.have.status(200);
        expect(response).to.comprise.of.json(
            [{
                "id": "job",
                "title": "Job"
            }]
        );
        return chakram.wait();
    });
    it("should return a valid survey", () => {
        let response = chakram.get(url + "/surveys/job");
        expect(response).to.have.status(200);
        expect(response).to.comprise.of.json(jobSurvey);
        return chakram.wait();
    });
    it("should return a 'not found' error", () => {
        let response = chakram.get(url + "/surveys/doesnotexist");
        expect(response).to.have.status(404);
        return chakram.wait();
    });
});

const validResponse = require('./data/responses/validResponse.json');
const invalidResponse = require('./data/responses/invalidResponse.json');

describe("Response API", function () {
    it("should save a resposse", () => {
        let response = chakram.post(url + "/surveys/job/responses", validResponse);
        return expect(response).to.have.status(201);
    });
    it("should return a 'not found' error", () => {
        let response = chakram.post(url + "/surveys/doesnotexist/responses", validResponse);
        return expect(response).to.have.status(404);
    });
    it("should return a schema validation error", () => {
        let response = chakram.post(url + "/surveys/job/responses", { "areYouInvalid": { "iam": true } });
        expect(response).to.have.status(400);
        expect(response).to.comprise.of.json({
            "status": 400,
            "errorCode": "JSON_VALIDATION_ERROR",
            "message": "Invalid JSON document"
        });
        return chakram.wait();
    });
    it("should raise a validation error", () => {
        let response = chakram.post(url + "/surveys/job/responses", invalidResponse);
        expect(response).to.have.status(422);
        expect(response).to.comprise.of.json(
            {
                "status": 422,
                "errorCode": "VALIDATION_ERROR",
                "message": "Your input is not valid",
                "details": [
                    {
                        "questionId": "name",
                        "errors": ["Please provide a name."]
                    },
                    {
                        "questionId": "department",
                        "errors": ["Invalid selection: noDept"]
                    },
                    {
                        "questionId": "jobHappiness",
                        "errors": ["Selected value not in range: 10"]
                    },
                    {
                        "questionId": "comment",
                        "errors": ["Comment cannot be longer than 500 characters."]
                    }                                
                ]
            }
        );
        return chakram.wait();
    });
});