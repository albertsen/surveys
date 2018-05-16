<template>
  <b-form-textarea
    v-model="responses[question.id]"
    :rows="3"
    :max-rows="6"
    :state="state">
  </b-form-textarea>
</template>
<script>
export default {
  name: "CommentQuestion",
  props: [
    "question",
    "responses",
    "state"
  ]
}
</script>

