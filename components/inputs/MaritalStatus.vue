<template>
  <b-form-group class="mb-3">
    <label>وضعیت تأهل</label>
    <b-form-radio-group id="marital-status" name="marital_status"
                        v-model="mutableMaritalStatus">
      <b-form-radio :value="false">مجرد</b-form-radio>
      <b-form-radio :value="true">متأهل</b-form-radio>
    </b-form-radio-group>
  </b-form-group>
</template>

<script>
export default {
  props: ['maritalStatus'],
  model: {
    prop: 'maritalStatus',
    event: 'change'
  },
  computed: {
    mutableMaritalStatus: {
      get: function () {
        return this.maritalStatus
      },
      set: function (maritalStatus) {
        this.$emit('change', maritalStatus)
      }
    }
  }
}
</script>
