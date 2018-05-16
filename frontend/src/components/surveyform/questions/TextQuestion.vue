<template>
  <b-form-input
    type="text"
    v-model.trim="responses[question.id]"
    :maxlength="question.maxlength || 70"
    :state="state">
  </b-form-input>
</template>
<script>
export default {
  name: "TextQuestion",
  props: [
    "question",
    "responses",
    "state"
  ],
}
</script>

