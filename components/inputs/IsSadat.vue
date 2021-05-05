<template>
  <div class="form-group mt-4">
    <label>آیا کاربر سید است؟ {{ isSadat ? 'بله' : 'خیر' }} </label>
    <switches v-model="mutableIsSadat"
              class="d-block"
              :type-bold="false" color="primary"/>
  </div>
</template>

<script>
import Switches from 'vue-switches';

export default {
  props: ['isSadat'],
  model: {
    prop: 'isSadat',
    event: 'change'
  },
  components: {
    Switches
  },
  computed: {
    mutableIsSadat: {
      get: function () {
        return this.isSadat
      },
      set: function (isSadat) {
        this.$emit('change', isSadat)
      }
    }
  }
}
</script>

<style scoped>

</style>
