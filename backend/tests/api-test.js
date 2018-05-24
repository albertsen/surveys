const chakram = require('chakram');
const jobSurvey = require('./data/surveys/job.json');

expect = chakram.expect;

const url = 'http://localhost:3000'

describe("Survey API", function () {
    it("should create survey", () => {
        let response = chakram.put(url + "/surveys/job", jobSurvey);
        return expect(response).to.have.status(201);
    });
    it("should return an overview list of surveys", () => {
        let response = chakram.get(url + "/surveys");
        expect(response).to.have.status(200);
        expect(response).to.comprise.of.json(
            [{
                "id": "job",
                "title": "Job Survey"
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

});

const validResponse = {
    "surveyId": "job",
    "responses": {
    	"name": "Jürgen Albertsen",
    	"department": "productDev",
    	"jobHappiness": 5,
    	"commment": "Nope"
    }
};

describe("Response API", function () {
    it("should save a resposse", () => {
        let response = chakram.post(url + "/responses", validResponse);
        return expect(response).to.have.status(201);
    });
});