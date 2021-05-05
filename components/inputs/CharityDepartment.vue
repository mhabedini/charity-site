<template>
  <div class="form-group">
    <label for="charity-departments">
      عنوان موسسه خیریه
    </label>
    <input id="charity-departments" :value="value" name="charity-departments" class="form-control"
           :class="{ 'is-invalid': submitted && this.validation.$error }" type="text"
           placeholder="عنوان موسسه خیریه را وارد کنید"
           @input="$emit('update', $event.target.value)"/>
    <div v-if="submitted && this.validation.$error" class="invalid-feedback">
      <span v-if="!this.validation.required">ورود این مقدار لازم است</span>
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
