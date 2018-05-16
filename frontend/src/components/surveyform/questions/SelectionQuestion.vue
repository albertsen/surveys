<template>
  <b-form-select v-model="responses[question.id]" class="custom-select d-block w-100" :state="state">
    <option v-for="(value, key) in question.options" v-bind:key="key" :value="key">{{ value }}</option>
  </b-form-select>
</template>
<script>
export default {
  name: 'SelectionQuestion',
  props: [
    "question",
    "responses",
    "state"
  ]
}
</script>

