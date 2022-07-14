<template>
  <div dir="rtl" class="form-group">
    <label>
      وضعیت سرپرست
      <span class="text-danger">*</span>
    </label>
    <multiselect placeholder="انتخاب کنید"
                 selectedLabel="انتخاب شده"
                 selectLabel="لطفا انتخاب کنید"
                 deselectLabel="لطفا برای عدم انتخاب کلیک کنید"
                 v-model="mutableSupervisorStatus"
                 :options="supervisorStatuses"
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
  props: ['supervisorStatus', 'supervisorStatuses'],
  model: {
    prop: 'supervisorStatus',
    event: 'change'
  },
  computed: {
    mutableSupervisorStatus: {
      get: function () {
        return this.supervisorStatus
      },
      set: function (supervisorStatus) {
        this.$emit('change', supervisorStatus)
      }
    }
  }
}
</script>
