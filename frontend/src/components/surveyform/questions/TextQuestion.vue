<template>
  <input
    type="text"
    class="form-control"
    v-model.trim="responses[question.id]"
    :maxlength="question.maxlength || 70"
    :class="{'is-invalid': valid == false}">
</template>
<script>
export default {
  name: "TextQuestion",
  props: [
    "question",
    "responses",
    "valid"
  ],
}
</script>

