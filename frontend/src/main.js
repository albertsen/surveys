import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import BoostrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import SurveyList from './components/SurveyList'
import SurveyForm from './components/surveyform'

Vue.use(BoostrapVue);
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
