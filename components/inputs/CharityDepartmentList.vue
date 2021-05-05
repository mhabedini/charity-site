<template>
  <div dir="rtl" class="form-group">
    <label>
      موسسه خیریه
    </label>
    <multiselect placeholder="انتخاب کنید"
                 selectedLabel="انتخاب شده"
                 selectLabel="لطفا انتخاب کنید"
                 deselectLabel="لطفا برای عدم انتخاب کلیک کنید"
                 v-model="mutableCharityDepartment"
                 :options="charityDepartments"
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
  props: ['charityDepartment', 'charityDepartments'],
  model: {
    prop: 'charityDepartment',
    event: 'change'
  },
  computed: {
    mutableCharityDepartment: {
      get: function () {
        return this.charityDepartment
      },
      set: function (charityDepartment) {
        this.$emit('change', charityDepartment)
      }
    }
  }
}
</script>
