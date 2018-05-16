import axios from 'axios';

const client = axios.create({
  baseURL: process.env.SERVER_URL
});

class SurveyService {

  getSurveyList() {
    return client.get("/surveys")
      .catch(e => {
        console.log(e);
      });
  }

  getSurvey(id) {
    return client.get("/surveys/" + id)
      .catch(e => {
        console.log(e);
      });
  }

  saveResponses(surveyId, responses) {
    let payload = {
      surveyId: surveyId,
      responses: responses
    }
    return client.post("/responses", payload)
      .catch(e => {
        console.log(e);
      });
  }

}

export default new SurveyService();
