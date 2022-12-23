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

              <father-name :validation="this.$v.familyMember.father_name"
                           :submitted="submitted"
                           v-model="familyMember.father_name"/>

              <national-code :validation="this.$v.familyMember.national_code"
                             :submitted="submitted"
                             v-model="familyMember.national_code"/>

              <citizenship v-model="nationality" :countries="countries"/>

              <div class="form-group">
                <label>تاریخ تولد</label>
                <date-picker dir="rtl" v-model="familyMember.birth_date" format="YYYY-MM-DD"
                             display-format="jYYYY-jMM-jDD"/>
              </div>

              <email :validation="this.$v.familyMember.email"
                     :submitted="submitted"
                     v-model="familyMember.email"/>

              <dropdown v-model="maritalStatus" :data="maritalStatuses" :is-mandatory="true" title="وضعیت تاهل"/>

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

              <RepresentativeMobile :submitted="submitted"
                                    v-model="familyMember.representative_mobile"
                                    :validation="this.$v.familyMember.representative_mobile"/>

              <dropdown v-model="religion" :data="religions" :is-mandatory="true" title="مذهب"/>

              <dropdown v-model="education" :data="educationDegrees" :is-mandatory="false" title="سطح تحصیلات"/>

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
import FatherName from "@/components/inputs/FatherName";
import Citizenship from "@/components/inputs/Citizenship";
import NationalCode from "@/components/inputs/NationalCode";
import Phone from "@/components/inputs/Phone";
import Mobile from "@/components/inputs/Mobile";
import Email from "@/components/inputs/Email";
import Gender from "@/components/inputs/Gender";
import Dropdown from "@/components/inputs/Dropdown";
import Representative from "@/components/inputs/Representative";
import Job from "@/components/inputs/Job";
import IsSadat from "@/components/inputs/IsSadat";
import RepresentativeMobile from "~/components/inputs/RepresentativeMobile";


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
    Dropdown,
    FatherName,
    Citizenship,
    NationalCode,
    Phone,
    Mobile,
    Email,
    Gender,
    Representative,
    RepresentativeMobile,
    Job,
    Switches,
    IsSadat
  },
  data() {
    return {
      title: "ایجاد عضو خانواده جدید",
      familyMember: {
        first_name: '',
        last_name: '',
        father_name: '',
        email: null,
        phone: null,
        mobile: null,
        gender: 'male',
        birth_date: null,
        national_code: '',
        marital_status: false,
        job: null,
        citizenship: null,
        religion: null,
        is_sadat: false,
        education: null,
        representative: null,
        representative_mobile: null,
        household_id: null
      },
      gender: '',
      submitted: false,
      maritalStatuses: Array,
      maritalStatus: null,
      countries: Array,
      religion: null,
      education: null,
      educationDegrees: Array,
      nationality: null,
      religions: Array,
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
      father_name: {
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
      },
      representative_mobile: {
        minLength: minLength(11),
        maxLength: maxLength(11)
      },
    }
  },
  async asyncData({$axios, params}) {
    const maritalStatuses = await $axios.get('/marital-statuses');
    const countries = await $axios.get('/countries');
    let religions = await $axios.get('/religions');
    let educationDegrees = await $axios.get('/education-degrees');
    return {
      maritalStatuses: maritalStatuses.data.data,
      countries: countries.data.data,
      educationDegrees: educationDegrees.data.data,
      religions: religions.data.data,
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
  },
  watch: {
    maritalStatus: function () {
      this.familyMember.marital_status = this.maritalStatus.value
    },
    religion: function () {
      this.familyMember.religion = this.religion.value
    },
    nationality: function () {
      this.familyMember.citizenship = this.nationality.id
    },
    education: function () {
      this.familyMember.education = this.education.value
    }
  }
}
</script>
