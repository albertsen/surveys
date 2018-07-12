import axios from 'axios';

const client = axios.create({
  baseURL: process.env.SERVER_URL,
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

  saveResponses(surveyId, responses, callbacks) {
    let payload = {
      surveyId: surveyId,
      responses: responses
    }
    return client.post("/responses", payload)
      .then(res => callbacks.onSuccess(res))
      .catch(err => {
        if (err.response && err.response.status == 422) {
          callbacks.onValidationError(err.response.data.details);
        }
        else {
          console.log("Unhandled error: " + err);
        }
      });
  }

}

export default new SurveyService();
