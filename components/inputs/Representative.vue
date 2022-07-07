<template>
  <div class="form-group">
    <label for="representative">
      معرف
    </label>
    <input id="representative" :value="value" name="representative" class="form-control"
           type="text"
           placeholder="معرف را وارد کنید"
           @input="$emit('update', $event.target.value)"/>
  </div>
</template>

<script>
export default {
  props: ["value"],
  model: {
    prop: "value",
    event: "update"
  },
}
</script>

<style scoped>

</style>
