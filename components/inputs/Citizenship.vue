<template>
  <div dir="rtl" class="form-group">
    <label>
      ملیت
      <span class="text-danger">*</span>
    </label>
    <multiselect placeholder="انتخاب کنید"
                 selectedLabel="انتخاب شده"
                 selectLabel="لطفا انتخاب کنید"
                 deselectLabel="لطفا برای عدم انتخاب کلیک کنید"
                 v-model="mutableCitizenship"
                 :options="countries"
                 label="name"
                 track-by="id"/>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },
  props: ['citizenship', 'countries'],
  model: {
    prop: 'citizenship',
    event: 'change'
  },
  computed: {
    mutableCitizenship: {
      get: function () {
        return this.citizenship
      },
      set: function (citizenship) {
        this.$emit('change', citizenship)
      }
    }
  }
}
</script>
