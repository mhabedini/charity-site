<template>
  <div dir="rtl" class="form-group">
    <label>
      وضعیت خانه
      <span class="text-danger">*</span>
    </label>
    <multiselect placeholder="انتخاب کنید"
                 selectedLabel="انتخاب شده"
                 selectLabel="لطفا انتخاب کنید"
                 deselectLabel="لطفا برای عدم انتخاب کلیک کنید"
                 v-model="mutableHousingSituation"
                 :options="housingSituations"
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
  props: ['housingSituation', 'housingSituations'],
  model: {
    prop: 'housingSituation',
    event: 'change'
  },
  computed: {
    mutableHousingSituation: {
      get: function () {
        return this.housingSituation
      },
      set: function (housingSituation) {
        this.$emit('change', housingSituation)
      }
    }
  }
}
</script>
