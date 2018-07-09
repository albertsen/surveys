<template>
  <select v-model="responses[question.id]" class="custom-select d-block w-100" :class="{'is-invalid': valid == false}">
    <option v-for="(value, key) in question.options" v-bind:key="key" :value="key">{{ value }}</option>
  </select>
</template>
<script>
export default {
  name: 'SelectionQuestion',
  props: [
    "question",
    "responses",
    "valid"
  ]
}
</script>

