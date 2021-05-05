<template>
  <div class="form-group">
    <label for="password">
      رمز عبور
      <span class="text-danger">*</span>
    </label>
    <input id="password" :value="value" type="password" name="password" class="form-control"
           autocomplete="new-password"
           :class="{ 'is-invalid': submitted && this.validation.$error }"
           placeholder="رمز عبور را وارد کنید"
           @input="$emit('update', $event.target.value)"/>
    <div v-if="submitted && this.validation.$error" class="invalid-feedback">
      <span v-if="!this.validation.required">ورود این مقدار لازم است</span>
      <span v-if="!this.validation.minLength">رمز عبور باید حداقل شش کاراکتر باشد</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "submitted", "validation"],
  model: {
    prop: "value",
    event: "update"
  }
}
</script>
