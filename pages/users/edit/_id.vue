<template>
  <div>
    <PageHeader :title="title"/>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="submitUser" autocomplete="off">
          <div class="row">
            <div class="col-lg-6">

              <first-name :validation="this.$v.user.first_name"
                          :submitted="submitted"
                          v-model="user.first_name"/>

              <last-name :validation="this.$v.user.last_name"
                         :submitted="submitted"
                         v-model="user.last_name"/>

              <father-name :validation="this.$v.user.father_name"
                           :submitted="submitted"
                           v-model="user.father_name"/>

              <national-code :validation="this.$v.user.national_code"
                             :submitted="submitted"
                             v-model="user.national_code"/>

              <citizenship v-model="nationality" :countries="countries"/>

              <div class="form-group">
                <label>تاریخ تولد</label>
                <date-picker dir="rtl" v-model="user.birth_date" format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD"/>
              </div>

              <email :validation="this.$v.user.email"
                     :submitted="submitted"
                     v-model="user.email"/>

              <marital-status v-model="maritalStatus" :marital-statuses="maritalStatuses"/>

              <gender v-model="user.gender"/>

              <is-sadat v-model="user.is_sadat"/>

            </div>

            <div class="col-lg-6">

              <phone :submitted="submitted"
                     v-model="user.phone"
                     :validation="this.$v.user.phone"/>

              <Mobile :submitted="submitted"
                      v-model="user.mobile"
                      :validation="this.$v.user.mobile"/>

              <job v-model="user.job"/>

              <representative v-model="user.representative"/>

              <religion v-model="religion" :religions="religions"/>

              <password :submitted="submitted"
                        v-model="user.password"
                        :validation="this.$v.user.password"/>

              <confirm-password :submitted="submitted"
                                v-model="user.confirmPassword"
                                :validation="this.$v.user.confirmPassword"/>

            </div>
          </div>
          <div class="form-group text-right m-b-0">
            <button class="btn btn-primary" type="submit">ویرایش کاربر</button>
          </div>
        </form>
        <!-- end card-box -->
      </div>
      <!-- end col -->
    </div>
  </div>
</template>

<script>
import {email, maxLength, minLength, required, sameAs} from 'vuelidate/lib/validators'
import Multiselect from 'vue-multiselect'
import DatePicker from 'vue-persian-datetime-picker'
import FirstName from "@/components/inputs/FirstName";
import LastName from "@/components/inputs/LastName";
import FatherName from "@/components/inputs/FatherName";
import NationalCode from "@/components/inputs/NationalCode";
import Phone from "@/components/inputs/Phone";
import Mobile from "@/components/inputs/Mobile";
import Email from "@/components/inputs/Email";
import MaritalStatus from "@/components/inputs/MaritalStatus";
import Gender from "@/components/inputs/Gender";
import Password from "@/components/inputs/Password";
import ConfirmPassword from "@/components/inputs/ConfirmPassword";
import Representative from "@/components/inputs/Representative";
import Job from "@/components/inputs/Job";
import IsSadat from "@/components/inputs/IsSadat";
import Religion from "@/components/inputs/Religion";
import Citizenship from "~/components/inputs/Citizenship";


export default {
  head() {
    return {
      title: `${this.title}`
    };
  },
  components: {
    Citizenship,
    Multiselect,
    DatePicker,
    FirstName,
    LastName,
    FatherName,
    NationalCode,
    Religion,
    Phone,
    Mobile,
    Email,
    MaritalStatus,
    Gender,
    Password,
    ConfirmPassword,
    Representative,
    Job,
    IsSadat
  },
  data() {
    return {
      title: "ویرایش کاربر",
      user: {
        first_name: null,
        last_name: null,
        father_name: null,
        email: null,
        phone: null,
        mobile: null,
        gender: null,
        is_sadat: Boolean,
        birth_date: null,
        national_code: null,
        marital_status: null,
        job: null,
        religion: null,
        citizenship: null,
        representative: null,
        password: null,
        confirmPassword: null,
      },
      religion: null,
      nationality: null,
      countries: Array,
      religions: Array,
      maritalStatus: null,
      maritalStatuses: Array,
      submitted: false,
    }
  },
  validations: {
    user: {
      first_name: {
        required
      },
      last_name: {
        required
      },
      father_name: {
        required
      },
      email: {
        required,
        email
      },
      phone: {
        minLength: minLength(9),
        maxLength: maxLength(12)
      },
      mobile: {
        required,
        minLength: minLength(11),
        maxLength: maxLength(11)
      },
      national_code: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10)
      },
      password: {
        minLength: minLength(6)
      },
      confirmPassword: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  async asyncData({$axios, params}) {
    const user = await $axios.get(`/users/${params.id}`)
    let religions = await $axios.get('/religions');
    let countries = await $axios.get('/countries');
    let maritalStatuses = await $axios.get('/marital-statuses');
    return {
      user: user.data.data,
      nationality: countries.data.data.find(nationality => nationality.id === user.data.data.citizenship),
      countries: countries.data.data,
      religion: religions.data.data.find(religion => religion.value === user.data.data.religion),
      religions: religions.data.data,
      maritalStatus: maritalStatuses.data.data.find(maritalStatus => maritalStatus.value === user.data.data.marital_status),
      maritalStatuses: maritalStatuses.data.data,
    }
  },
  methods: {
    async submitUser() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitted = true
      } else {
        await this.$axios.patch(`/users/${this.$route.params.id}`, this.user)
          .then(value => this.$showSuccessfulToast())
          .catch(reason => {
            this.$showUnsuccessfulToast()
            console.log(reason.response.data)
          })
      }
    }
  },
  watch: {
    religion: function () {
      this.user.religion = this.religion.value
    },
    nationality: function () {
      this.user.citizenship = this.nationality.id
    },
    maritalStatus: function () {
      this.user.marital_status = this.maritalStatus.value
    }
  },
  mounted() {
    this.user.birth_date = this.user.birth_date ? this.user.birth_date.split('T')[0] : null
  }
}
</script>
