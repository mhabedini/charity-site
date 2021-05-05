<template>
  <div>
    <PageHeader :title="title"/>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="submitCharityDepartment" autocomplete="off">
          <div class="row">
            <div class="col-lg-6">
              <charity-department :submitted="submitted"
                                  :validation="this.$v.charityDepartment.title"
                                  v-model="charityDepartment.title"/>
            </div>
          </div>
          <div class="form-group text-right m-b-0">
            <button class="btn btn-primary" type="submit">ثبت موسسه خیریه جدید</button>
          </div>
        </form>
      </div>
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
      title: "ایجاد موسسه خیریه جدید",
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
  methods: {

    async submitCharityDepartment() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitted = true
      } else {
        const charityDepartment = await this.$axios.post('/charity-departments', this.charityDepartment)
          .then(value => {
            this.$showSuccessfulToast()
            this.$router.push(`/charity-departments/edit/${value.data.data.id}`)
          })
          .catch(reason => this.$showUnsuccessfulToast())
      }
    },
  }
}
</script>
