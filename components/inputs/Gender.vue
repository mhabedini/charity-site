<template>
  <b-form-group class="mb-3">
    <label>جنسیت</label>
    <b-form-radio-group id="gender" name="gender"
                        v-model="mutableGender">
      <b-form-radio value="male">مرد</b-form-radio>
      <b-form-radio value="female">زن</b-form-radio>
    </b-form-radio-group>
  </b-form-group>
</template>

<script>

export default {
  props: ['gender'],
  model: {
    prop: 'gender',
    event: 'change'
  },
  computed: {
    mutableGender: {
      get: function () {
        return this.gender
      },
      set: function (gender) {
        this.$emit('change', gender)
      }
    }
  }
}
</script>
