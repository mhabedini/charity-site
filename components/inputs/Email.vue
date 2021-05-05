<template>
  <div class="form-group">
    <label for="email">
      آدرس پست الکترونیک
      <span class="text-danger">*</span>
    </label>
    <input id="email" :value="value" type="email" name="email" class="form-control"
           :class="{ 'is-invalid': submitted && this.validation.$error }"
           placeholder="پست الکترونیک را وارد کنید"
           @input="$emit('update', $event.target.value)"/>
    <div v-if="submitted && this.validation.$error" class="invalid-feedback">
      <span v-if="!this.validation.required">ورود این مقدار لازم است</span>
      <span v-if="!this.validation.email">لطفا یک پست الکترونیک صحیح وارد کنید</span>
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
