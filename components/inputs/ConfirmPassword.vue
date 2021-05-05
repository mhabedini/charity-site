<template>
  <div class="form-group">
    <label for="confirm-password">
      تایید رمز عبور
      <span class="text-danger">*</span>
    </label>
    <input id="confirm-password" :value="value" type="password" name="confirmPassword"
           class="form-control" :class="{ 'is-invalid': submitted && this.validation.$error }"
           placeholder="تکرار رمز عبور را وارد کنید"
           @input="$emit('update', $event.target.value)"/>
    <div v-if="submitted && this.validation.$error" class="invalid-feedback">
      <span v-if="!this.validation.required">ورود این مقدار لازم است</span>
      <span
        v-else-if="!this.validation.sameAsPassword">این مقدار باید با مقدار رمز عبور یکسان باشد</span>
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
