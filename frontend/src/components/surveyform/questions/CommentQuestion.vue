<template>
  <textarea
    class="form-control"
    v-model="responses[question.id]"
    :rows="3"
    :class="{ 'is-invalid': valid == false }"
    :max-rows="6">
  </textarea>
</template>
<script>
export default {
  name: "CommentQuestion",
  props: [
    "question",
    "responses",
    "valid"
  ]
}
</script>

