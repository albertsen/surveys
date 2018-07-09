<template>
  <div id="survey">
    <div class="container">
      <div class="py-5 text-center">
        <h1>{{ survey.title }}</h1>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-md-8 order-md-1">
          <form id="survey-form">
            <div v-for="q in survey.questions" :key="q.id" class="question mb-3">
              <label :for="q.id">{{q.title}}<span v-if="q.mandatory">&nbsp;*</span></label>
              <component v-bind:is="q.type + 'Question'" :question="q" :responses="responses" :valid="isValid(q.id)"></component>
              <div class="invalid-feedback" style="display: block" v-if="isInvalid(q.id)">
                {{ validationResult[q.id].message }}
              </div>
            </div>
            <button class="btn btn-primary btn-lg btn-block" type="submit" v-on:click="submit()">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import surveyService from "../../services/SurveyService";
import questions from "./questions";

export default {
  name: "SurveyForm",
  components: questions,
  methods: {
    submit: function() {
      surveyService.saveResponses(this.survey.id, this.responses, {
        onSuccess: res => {
          this.responses = {};
          this.validationResult = {};
        },
        onValidationError: errors => {
          console.log("Errors: " + JSON.stringify(errors));
          this.validationResult = errors.reduce((result, e) => {
            result[e.questionId] = {
              valid: false,
              message: e.errors[0]
            }
            return result;
          }, {});
          console.log("Validation result: " + JSON.stringify(this.validationResult));
        }
      });
    },
    isValid: function(questionId) {
      let res = this.validationResult[questionId];
      return res != null ? res.valid : undefined;
    },
    isInvalid: function(questionId) {
      let res = this.validationResult[questionId];
      return res != null ? !res.valid : false;
    }
  },
  data() {
    return {
      survey: {},
      responses: {},
      validationResult: {},
    };
  },
  created() {
    surveyService.getSurvey(this.$route.params.id).then(response => {
      this.survey = response.data;
    });
  }
};
</script>
<style lang="scss">
.question {
  padding-bottom: 1em;
}

.question label {
  font-size: 120%;
}
.rating td {
  text-align: center;
  vertical-align: middle;
  font-size: 80%;
}
</style>
