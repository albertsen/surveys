var chakram = require('chakram');
expect = chakram.expect;

const url = 'http://localhost:3000'

describe("Survey API", function () {
    it("should return an overview list of surveys", () => {
        let response = chakram.get(url + "/surveys");
        expect(response).to.have.status(200);
        expect(response).to.comprise.of.json(
            [{
                "id": "ec",
                "title": "Enterprise Commerce Survey"
            }, {
                "id": "music",
                "title": "Music"
            }]
        );
        return chakram.wait();
    });
    it("should return a valid survey", () => {
        let response = chakram.get(url + "/surveys/ec");
        expect(response).to.have.status(200);
        expect(response).to.comprise.of.json(require('../data/surveys/ec.json'));
        return chakram.wait();
    });

});

const validResponse = {
    "surveyId": "ec",
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