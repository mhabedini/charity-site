<template>
  <div class="form-group">
    <label for="job">
      شغل
    </label>
    <input id="job" :value="value" name="job" class="form-control" type="text"
           placeholder="شغل را وارد کنید"
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
