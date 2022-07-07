<template>
  <div class="form-group">
    <label for="father_name">
      نام پدر
      <span class="text-danger">*</span>
    </label>
    <input id="father_name" :value="value" name="father_name" class="form-control"
           :class="{ 'is-invalid': submitted && this.validation.$error }" type="text"
           placeholder="نام پدر را وارد کنید"
           @input="$emit('update', $event.target.value)"/>
    <div v-if="submitted && !this.validation.required" class="invalid-feedback">ورود این مقدار لازم
      است
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "submitted", "validation"],
  model: {
    prop: "value",
    event: "update"
  },
}
</script>

<style scoped>

</style>
