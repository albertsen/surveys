<template>
  <table class="rating w-100">
    <tr>
      <td :width="calculateRangeColumnWidth(question.range)"
          v-for="v in question.range"
          :key="v">
            <label :for="question.id + '-' + v">{{ v }}</label>
        </td>
    </tr>
    <tr>
      <td :width="calculateRangeColumnWidth(question.range)"
          v-for="v in question.range"
          :key="v">
            <input
              type="radio"
              :id="question.id + '-' + v"
              v-model="responses[question.id]"
              :value="v"
              class="custom-control-input"
              :class="{valid: valid}">
            </td>
    </tr>
    <tr>
      <td
        :width="calculateRangeColumnWidth(question.range)"
        v-for="(v, i) in question.range"
        :key="v">{{ rangeLabel(question, i) }}</td>
    </tr>
  </table>
</template>
<script>
export default {
  name: 'RatingQuestion',
  props: [
    "question",
    "responses",
    "valid"
  ],
  methods: {
    rangeLabel: function(question, i) {
      if (i == 0) {
        return question.lowEndLabel;
      }
      else if (i == (question.range.length - 1)) {
        return question.highEndLabel;
      }
    },
    calculateRangeColumnWidth: function(range) {
      var width = 100 / range.length;
      return width + "%";
    },
  }
}
</script>
<style>
/* table.rating {
  border: 1px solid #ced4da;
} */
.is-invalid {
  border: 1px solid #dc3545;
}
</style>


