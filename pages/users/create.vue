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

              <dropdown v-model="state" :data="states" :is-mandatory="true" title="استان"/>

              <dropdown v-model="city" :data="cities" :is-mandatory="true" title="شهر"/>

              <dropdown v-model="district" :data="districts" :is-mandatory="true" title="محله"/>

              <postal-code :validation="this.$v.address.postal_code"
                           :submitted="submitted"
                           v-model="address.postal_code"/>

              <long-text v-model="address.address" title="آدرس" placeholder="آدرس را وارد کنید"
                         :is-mandatory="false"
                         :rows="3"/>

              <div class="form-group">
                <label>تاریخ تولد</label>
                <date-picker dir="rtl" v-model="user.birth_date" format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD"/>
              </div>

              <email :validation="this.$v.user.email"
                     :submitted="submitted"
                     v-model="user.email"/>
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

              <dropdown v-model="religion" :data="religions" :is-mandatory="true" title="مذهب"/>

              <dropdown v-model="education" :data="educationDegrees" :is-mandatory="false" title="سطح تحصیلات"/>

              <password :submitted="submitted"
                        v-model="user.password"
                        :validation="this.$v.user.password"/>

              <confirm-password :submitted="submitted"
                                v-model="user.confirmPassword"
                                :validation="this.$v.user.confirmPassword"/>

              <dropdown v-model="maritalStatus" :data="maritalStatuses" :is-mandatory="true" title="وضعیت تاهل"/>

              <gender v-model="user.gender"/>

              <is-sadat v-model="user.is_sadat"/>

            </div>
          </div>
          <div class="form-group text-right m-b-0">
            <button class="btn btn-primary" type="submit">ثبت کاربر جدید</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {email, maxLength, minLength, required, sameAs} from 'vuelidate/lib/validators';
import Switches from 'vue-switches';
import DatePicker from 'vue-persian-datetime-picker';
import FirstName from "@/components/inputs/FirstName";
import LastName from "@/components/inputs/LastName";
import FatherName from "@/components/inputs/FatherName";
import NationalCode from "@/components/inputs/NationalCode";
import Phone from "@/components/inputs/Phone";
import Mobile from "@/components/inputs/Mobile";
import Email from "@/components/inputs/Email";
import Gender from "@/components/inputs/Gender";
import Dropdown from "@/components/inputs/Dropdown";
import Password from "@/components/inputs/Password";
import ConfirmPassword from "@/components/inputs/ConfirmPassword";
import Representative from "@/components/inputs/Representative";
import PostalCode from "@/components/inputs/PostalCode";
import Job from "@/components/inputs/Job";
import IsSadat from "@/components/inputs/IsSadat";
import Citizenship from "~/components/inputs/Citizenship";
import LongText from "@/components/inputs/LongText";

export default {
  head() {
    return {
      title: `${this.title}`
    };
  },
  components: {
    DatePicker,
    FirstName,
    LastName,
    FatherName,
    PostalCode,
    NationalCode,
    Phone,
    Dropdown,
    Mobile,
    Email,
    Gender,
    Password,
    ConfirmPassword,
    Representative,
    Job,
    Switches,
    IsSadat,
    LongText,
    Citizenship
  },
  data() {
    return {
      title: "ایجاد کاربر جدید",
      user: {
        first_name: null,
        last_name: null,
        father_name: null,
        email: null,
        phone: null,
        mobile: null,
        gender: 'male',
        birth_date: null,
        national_code: null,
        marital_status: null,
        job: null,
        citizenship: null,
        is_sadat: false,
        religion: null,
        education: null,
        representative: null,
        password: null,
        confirmPassword: null,
      },
      address: {
        state_id: null,
        city_id: null,
        district_id: null,
        address: '',
        postal_code: null,
        lat_long: null,
      },
      gender: '',
      religion: null,
      religions: Array,
      nationality: null,
      education: null,
      educationDegrees: Array,
      countries: Array,
      maritalStatus: null,
      states: Array,
      state: null,
      cities: Array,
      city: null,
      districts: Array,
      district: null,
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
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    },
    address: {
      postal_code: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10)
      },
    }
  },
  async asyncData({$axios}) {
    const religions = await $axios.get('/religions');
    const countries = await $axios.get('/countries');
    const states = await $axios.get('/states')
    const cities = await $axios.get('/cities')
    const districts = await $axios.get('/districts')
    const educationDegrees = await $axios.get('/education-degrees');
    const maritalStatuses = await $axios.get('/marital-statuses');
    return {
      countries: countries.data.data,
      religions: religions.data.data,
      states: states.data.data,
      cities: cities.data.data,
      districts: districts.data.data,
      educationDegrees: educationDegrees.data.data,
      maritalStatuses: maritalStatuses.data.data,
    }
  },
  methods: {
    async submitUser() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitted = true
      } else {
        const self = this
        const user = await this.$axios.post('/users', this.user)
          .then(function (response) {
            self.$showSuccessfulToast();
            const userId = response.data.data.id
            self.$axios.post(`/users/${userId}/addresses`, self.address)
          })
          .catch(reason => this.$showUnsuccessfulToast())
      }
    },
  },
  watch: {
    religion: function () {
      this.user.religion = this.religion?.value
    },
    nationality: function () {
      this.user.citizenship = this.nationality?.id
    },
    maritalStatus: function () {
      this.user.marital_status = this.maritalStatus?.value
    },
    education: function () {
      this.user.education = this.education?.value
    },
    state: function () {
      this.address.state_id = this.state?.value
    },
    city: function () {
      this.address.city_id = this.city?.value
    },
    district: function () {
      this.address.district_id = this.district?.value
    },
  }
}
</script>
