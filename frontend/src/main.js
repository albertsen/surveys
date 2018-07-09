import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import SurveyList from './components/SurveyList'
import SurveyForm from './components/surveyform'

Vue.use(Router);

const router = new Router({
  routes: [
    { path: "/", component: SurveyList },
    { path: "/surveys/:id", component: SurveyForm, name: 'surveys' }
  ]
});

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
