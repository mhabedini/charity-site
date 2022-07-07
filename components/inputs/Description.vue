<template>
  <div class="form-group">
    <label for="description">
      توضیحات
    </label>
    <textarea id="description" :value="value" name="description" class="form-control"
           :class="{ 'is-invalid': submitted && this.validation.$error }" type="text"
           placeholder="توضیحات را وارد کنید"
           @input="$emit('update', $event.target.value)" rows="8"/>
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
