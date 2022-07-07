<template>
  <div class="form-group">
    <label for="representative_mobile">
      شماره تلفن معرف
    </label>
    <input id="representative_mobile" :value="value" name="representative_mobile" class="form-control"
           :class="{ 'is-invalid': submitted && this.validation.$error }" type="text" pattern="^0[0-9]*"
           v-mask="'###########'"
           placeholder="شماره تلفن معرف را وارد کنید"
           @input="$emit('update', $event.target.value)"/>
    <div v-if="submitted && this.validation.$error" class="invalid-feedback">
      <span v-if="!this.validation.required">ورود این مقدار لازم است</span>
      <span v-if="!this.validation.minLength">شماره همراه باید 11 عدد باشد</span>
      <span v-if="!this.validation.maxLength">شماره همراه باید 11 عدد باشد</span>
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
