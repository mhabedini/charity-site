<template>
  <div class="form-group">
    <label for="first_name">
      نام
      <span class="text-danger">*</span>
    </label>
    <input id="first_name" :value="value" name="first_name" class="form-control"
           :class="{ 'is-invalid': submitted && this.validation.$error }" type="text"
           placeholder="نام را وارد کنید"
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
