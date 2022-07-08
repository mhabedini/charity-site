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

              <div class="form-group">
                <label>تاریخ تولد</label>
                <date-picker dir="rtl" v-model="user.birth_date" format="YYYY-MM-DD" display-format="jYYYY-jMM-jDD"/>
              </div>

              <email :validation="this.$v.user.email"
                     :submitted="submitted"
                     v-model="user.email"/>

              <marital-status v-model="user.marital_status"/>

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
import MaritalStatus from "@/components/inputs/MaritalStatus";
import Gender from "@/components/inputs/Gender";
import Password from "@/components/inputs/Password";
import ConfirmPassword from "@/components/inputs/ConfirmPassword";
import Representative from "@/components/inputs/Representative";
import Job from "@/components/inputs/Job";
import IsSadat from "@/components/inputs/IsSadat";
import Religion from "@/components/inputs/Religion";

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
    NationalCode,
    Phone,
    Mobile,
    Email,
    MaritalStatus,
    Gender,
    Religion,
    Password,
    ConfirmPassword,
    Representative,
    Job,
    Switches,
    IsSadat
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
        representative: null,
        password: null,
        confirmPassword: null,
      },
      gender: '',
      religion: null,
      religions: Array,
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
    }
  },
  async asyncData({$axios}) {
    let religions = await $axios.get('/religions');
    return {
      religions: religions.data.data,
    }
  },
  methods: {
    async submitUser() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitted = true
      } else {
        await this.$axios.post('/users', this.user)
          .then(value => this.$showSuccessfulToast())
          .catch(reason => this.$showUnsuccessfulToast())
      }
    },
  },
  watch: {
    religion: function () {
      this.user.religion = this.religion.value
    }
  }
}
</script>
