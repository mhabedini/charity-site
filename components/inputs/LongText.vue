<template>
  <div class="form-group">
    <label for="description">
      {{ title }}
    </label>
    <textarea id="description" :value="value" name="description" class="form-control"
              :class="{ 'is-invalid': submitted && this.validation.$error }" type="text"
              :placeholder="placeholder"
              @input="$emit('update', $event.target.value)" :rows="rows"/>
    <div v-if="submitted && !this.validation.required" class="invalid-feedback">ورود این مقدار لازم
      است
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "submitted", "validation", 'title', 'placeholder', 'isMandatory', 'rows'],
  model: {
    prop: "value",
    event: "update"
  },
}
</script>

<style scoped>

</style>
