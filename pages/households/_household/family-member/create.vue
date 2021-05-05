<template>
  <div>
    <PageHeader :title="title"/>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="submitFamilyMember" autocomplete="off">
          <div class="row">
            <div class="col-lg-6">

              <first-name :validation="this.$v.familyMember.first_name"
                          :submitted="submitted"
                          v-model="familyMember.first_name"/>

              <last-name :validation="this.$v.familyMember.last_name"
                         :submitted="submitted"
                         v-model="familyMember.last_name"/>

              <national-code :validation="this.$v.familyMember.national_code"
                             :submitted="submitted"
                             v-model="familyMember.national_code"/>

              <div class="form-group">
                <label>تاریخ تولد</label>
                <date-picker dir="rtl" v-model="familyMember.birth_date" format="YYYY-MM-DD"
                             display-format="jYYYY-jMM-jDD"/>
              </div>

              <email :validation="this.$v.familyMember.email"
                     :submitted="submitted"
                     v-model="familyMember.email"/>

              <marital-status v-model="familyMember.marital_status"/>

              <gender v-model="familyMember.gender"/>

              <is-sadat v-model="familyMember.is_sadat"/>
            </div>

            <div class="col-lg-6">

              <phone :submitted="submitted"
                     v-model="familyMember.phone"
                     :validation="this.$v.familyMember.phone"/>

              <Mobile :submitted="submitted"
                      v-model="familyMember.mobile"
                      :validation="this.$v.familyMember.mobile"/>

              <job v-model="familyMember.job"/>

              <representative v-model="familyMember.representative"/>
            </div>
          </div>
          <div class="form-group text-right m-b-0">
            <button class="btn btn-primary" type="submit">ثبت عضو خانواده جدید</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  email,
  minLength,
  maxLength
} from 'vuelidate/lib/validators';
import Switches from 'vue-switches';
import DatePicker from 'vue-persian-datetime-picker';
import FirstName from "@/components/inputs/FirstName";
import LastName from "@/components/inputs/LastName";
import NationalCode from "@/components/inputs/NationalCode";
import Phone from "@/components/inputs/Phone";
import Mobile from "@/components/inputs/Mobile";
import Email from "@/components/inputs/Email";
import MaritalStatus from "@/components/inputs/MaritalStatus";
import Gender from "@/components/inputs/Gender";
import Representative from "@/components/inputs/Representative";
import Job from "@/components/inputs/Job";
import IsSadat from "@/components/inputs/IsSadat";


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
    NationalCode,
    Phone,
    Mobile,
    Email,
    MaritalStatus,
    Gender,
    Representative,
    Job,
    Switches,
    IsSadat
  },
  data() {
    return {
      title: "ایجاد عضو خانواده جدید",
      familyMember: {
        first_name: 'محمد علی',
        last_name: 'عابدینی',
        email: null,
        phone: null,
        mobile: null,
        gender: 'male',
        birth_date: null,
        national_code: '0371111111',
        marital_status: false,
        job: null,
        citizenship: null,
        is_sadat: false,
        representative: null,
        household_id: null
      },
      gender: '',
      submitted: false,
    }
  },
  validations: {
    familyMember: {
      first_name: {
        required
      },
      last_name: {
        required
      },
      email: {
        email
      },
      phone: {
        minLength: minLength(9),
        maxLength: maxLength(12)
      },
      mobile: {
        minLength: minLength(11),
        maxLength: maxLength(11)
      },
      national_code: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(10)
      }
    }
  },
  methods: {
    async submitFamilyMember() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitted = true
      } else {
        await this.$axios.post('/family-members', this.familyMember)
          .then(value => this.$showSuccessfulToast())
          .catch(reason => this.$showUnsuccessfulToast())
      }
    }

  },
  mounted() {
    this.familyMember.household_id = this.$route.params.household
  }
}
</script>
