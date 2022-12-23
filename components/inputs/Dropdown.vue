<template>
  <div dir="rtl" class="form-group">
    <label>
      {{ title }}
      <span class="text-danger" v-if="isMandatory">*</span>
    </label>
    <multiselect placeholder="انتخاب کنید"
                 selectedLabel="انتخاب شده"
                 selectLabel="لطفا انتخاب کنید"
                 deselectLabel="لطفا برای عدم انتخاب کلیک کنید"
                 v-model="mutableSelected"
                 :options="data"
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
  props: ['selected', 'title', 'data', 'isMandatory'],
  model: {
    prop: 'selected',
    event: 'change'
  },
  computed: {
    mutableSelected: {
      get: function () {
        return this.selected
      },
      set: function (selected) {
        this.$emit('change', selected)
      }
    }
  }
};
</script>
