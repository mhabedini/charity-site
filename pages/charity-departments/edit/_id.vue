<template>
  <div>
    <PageHeader :title="title"/>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="submitCharityDepartments" autocomplete="off">
          <div class="row">
            <div class="col-lg-6">
              <charity-department :submitted="submitted"
                                  :validation="this.$v.charityDepartment.title"
                                  v-model="charityDepartment.title"/>
            </div>
          </div>
          <div class="form-group text-right m-b-0">
            <button class="btn btn-primary" type="submit">ویرایش موسسه خیریه</button>
          </div>
        </form>
        <!-- end card-box -->
      </div>
      <!-- end col -->
    </div>
  </div>
</template>

<script>
import {
  required
} from 'vuelidate/lib/validators'

import CharityDepartment from "@/components/inputs/CharityDepartment";


export default {
  head() {
    return {
      title: `${this.title}`
    };
  },
  components: {
    CharityDepartment
  },
  data() {
    return {
      title: "ویرایش موسسه خیریه",
      charityDepartment: {
        title: null
      },
      submitted: false,
    }
  },
  validations: {
    charityDepartment: {
      title: {
        required
      }
    }
  },
  async asyncData({$axios, params}) {
    const charityDepartments = await $axios.get(`/charity-departments/${params.id}`)
    return {
      charityDepartment: charityDepartments.data.data
    }
  },
  methods: {

    async submitCharityDepartments() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitted = true
      } else {
        const charityDepartment = await this.$axios.post(`/charity-departments/${this.$route.params.id}`, this.charityDepartment)
          .then(value => this.$showSuccessfulToast())
          .catch(reason => this.$showUnsuccessfulToast())
      }
    }
  }
}
</script>
