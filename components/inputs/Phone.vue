<template>
  <div class="form-group">
    <label for="phone">
      شماره تلفن
    </label>
    <input id="phone" :value="value" name="phone" class="form-control"
           :class="{ 'is-invalid': submitted && this.validation.$error }" type="text" pattern="^0[0-9]*"
           placeholder="شماره تلفن را وارد کنید"
           @input="$emit('update', $event.target.value)"/>
    <div v-if="submitted && this.validation.$error" class="invalid-feedback">
      <span v-if="!this.validation.minLength">شماره تلفن باید حداقل 9 کاراکتر باشد</span>
      <span v-if="!this.validation.maxLength">شماره تلفن باید حداکثر باید 12 کاراکتر باشد</span>
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
