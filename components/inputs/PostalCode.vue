<template>
  <div class="form-group">
    <label for="postal_code">
      کد پستی
      <span class="text-danger">*</span>
    </label>
    <input id="postal_code" :value="value" name="postal_code" class="form-control"
           :class="{ 'is-invalid': submitted && this.validation.$error }" type="text"
           pattern="[0-9]*"
           placeholder="کد پستی را وارد کنید" v-mask="'##########'"
           @input="$emit('update', $event.target.value)"/>
    <div v-if="submitted && this.validation.$error" class="invalid-feedback">
      <span v-if="!this.validation.required">ورود این مقدار لازم است</span>
      <span v-if="!this.validation.minLength">کد پستی باید 10 کاراکتر باشد</span>
      <span v-if="!this.validation.maxLength">کد پستی باید 10 کاراکتر باشد</span>
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
