<template>
  <div dir="rtl" class="form-group">
    <label>
      وضعیت تأهل
      <span class="text-danger">*</span>
    </label>
    <multiselect placeholder="انتخاب کنید"
                 selectedLabel="انتخاب شده"
                 selectLabel="لطفا انتخاب کنید"
                 deselectLabel="لطفا برای عدم انتخاب کلیک کنید"
                 v-model="mutableMaritalStatus"
                 :options="maritalStatuses"
                 label="label"
                 track-by="value"/>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },
  props: ['maritalStatus', 'maritalStatuses'],
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
