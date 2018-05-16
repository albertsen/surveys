<template>
  <div id="app">
    <div class="container">
      <div class="py-5 text-center">
        <h1>Available Surveys</h1>
        <ul class="survey-list">
          <li v-for="s in surveys" v-bind:key="s.id">
            <router-link :to="{ name: 'surveys', params: { id: s.id }}">{{s.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import surveyService from '../services/SurveyService'

export default {
  name: "SurveyList",
  data() {
    return {
      surveys: []
    }
  },
  created() {
    surveyService.getSurveyList().then(response => {
      this.surveys = response.data;
    });
  }
}
</script>
<style lang="scss">
.survey-list {
  padding-left: 0px;
}
.survey-list li {
  list-style-type: none;
}
</style>
