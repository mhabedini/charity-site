<template>
  <div dir="rtl" class="form-group">
    <label>
      مذهب
      <span class="text-danger">*</span>
    </label>
    <multiselect placeholder="انتخاب کنید"
                 selectedLabel="انتخاب شده"
                 selectLabel="لطفا انتخاب کنید"
                 deselectLabel="لطفا برای عدم انتخاب کلیک کنید"
                 v-model="mutableReligion"
                 :options="religions"
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
  props: ['religion', 'religions'],
  model: {
    prop: 'religion',
    event: 'change'
  },
  computed: {
    mutableReligion: {
      get: function () {
        return this.religion
      },
      set: function (religion) {
        this.$emit('change', religion)
      }
    }
  }
}
</script>
