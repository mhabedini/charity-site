<template>
  <div>
    <PageHeader :title="title"/>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="submitHousehold" autocomplete="off">
          <div class="row">
            <div class="col-lg-6">

              <first-name :validation="this.$v.household.user.first_name"
                          :submitted="submitted"
                          v-model="household.user.first_name"/>

              <last-name :validation="this.$v.household.user.last_name"
                         :submitted="submitted"
                         v-model="household.user.last_name"/>

              <father-name :validation="this.$v.household.user.father_name"
                           :submitted="submitted"
                           v-model="household.user.father_name"/>

              <national-code :validation="this.$v.household.user.national_code"
                             :submitted="submitted"
                             v-model="household.user.national_code"/>

              <citizenship v-model="nationality" :countries="countries"/>

              <div class="form-group">
                <label>تاریخ تولد</label>
                <date-picker dir="rtl" v-model="household.user.birth_date" format="YYYY-MM-DD"
                             display-format="jYYYY-jMM-jDD"/>
              </div>

              <email :validation="this.$v.household.user.email"
                     :submitted="submitted"
                     v-model="household.user.email"/>

              <long-text v-model="household.description" title="توضیحات" placeholder="توضیحات را وارد کنید"
                         :is-mandatory="false"
                         :rows="8"/>

              <dropdown v-model="maritalStatus" :data="maritalStatuses" :is-mandatory="true" title="وضعیت تاهل"/>

              <gender v-model="household.user.gender"/>

              <is-sadat v-model="household.user.is_sadat"/>

            </div>

            <div class="col-lg-6">

              <phone :submitted="submitted"
                     v-model="household.user.phone"
                     :validation="this.$v.household.user.phone"/>

              <Mobile :submitted="submitted"
                      v-model="household.user.mobile"
                      :validation="this.$v.household.user.mobile"/>

              <job v-model="household.user.job"/>

              <representative v-model="household.user.representative"/>

              <RepresentativeMobile :submitted="submitted"
                                    v-model="household.user.representative_mobile"
                                    :validation="this.$v.household.user.representative_mobile"/>

              <dropdown v-model="charityDepartment" :data="charityDepartments" :is-mandatory="true"
                        title="موسسه خیریه"/>

              <dropdown v-model="religion" :data="religions" :is-mandatory="true" title="مذهب"/>

              <dropdown v-model="education" :data="educationDegrees" :is-mandatory="false" title="سطح تحصیلات"/>

              <dropdown v-model="housingSituation" :data="housingSituations" :is-mandatory="true" title="وضعیت خانه"/>

              <dropdown v-model="supervisorStatus"
                        :data="supervisorStatuses"
                        :is-mandatory="true"
                        title="وضعیت سرپرست"/>

            </div>
          </div>
          <div class="form-group text-right m-b-0">
            <button class="btn btn-primary" type="submit">ثبت سرپرست جدید</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {email, maxLength, minLength, required} from 'vuelidate/lib/validators';
import DatePicker from 'vue-persian-datetime-picker';
import FirstName from "@/components/inputs/FirstName";
import FatherName from "@/components/inputs/FatherName";
import LastName from "@/components/inputs/LastName";
import NationalCode from "@/components/inputs/NationalCode";
import Phone from "@/components/inputs/Phone";
import Mobile from "@/components/inputs/Mobile";
import Email from "@/components/inputs/Email";
import Dropdown from "@/components/inputs/Dropdown";
import Gender from "@/components/inputs/Gender";
import Representative from "@/components/inputs/Representative";
import Job from "@/components/inputs/Job";
import IsSadat from "@/components/inputs/IsSadat";
import RepresentativeMobile from "~/components/inputs/RepresentativeMobile";
import Description from "@/components/inputs/LongText";
import Citizenship from "~/components/inputs/Citizenship";
import {housingSituations} from "~/components/housing-situatuations";
import {supervisorStatuses} from "~/components/supervisor-statuses";
import LongText from "@/components/inputs/LongText";


export default {
  head() {
    return {
      title: `${this.title}`
    };
  },
  components: {
    LongText,
    Description,
    RepresentativeMobile,
    Dropdown,
    DatePicker,
    FirstName,
    LastName,
    FatherName,
    NationalCode,
    Phone,
    Mobile,
    Email,
    Gender,
    Representative,
    Job,
    IsSadat,
    Citizenship
  },
  data() {
    return {
      title: "ایجاد سرپرست جدید",
      household: {
        user: {
          first_name: null,
          last_name: null,
          email: null,
          phone: null,
          mobile: null,
          gender: 'male',
          birth_date: null,
          national_code: null,
          marital_status: false,
          job: null,
          citizenship: null,
          is_sadat: false,
          religion: null,
          education: null,
          representative: null,
          representative_mobile: null,
        },
        charity_department_id: null,
        housing_situation: null,
        supervisor_status: null,
        description: null,
      },
      charityDepartments: Array,
      charityDepartment: null,
      religion: null,
      religions: Array,
      nationality: null,
      countries: Array,
      housingSituation: null,
      housingSituations: Array,
      supervisorStatus: null,
      supervisorStatuses: Array,
      education: null,
      educationDegrees: Array,
      maritalStatus: null,
      maritalStatuses: Array,
      submitted: false,
    };
  },
  validations: {
    household: {
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
        representative_mobile: {
          minLength: minLength(11),
          maxLength: maxLength(11)
        },
        national_code: {
          required,
          minLength: minLength(10),
          maxLength: maxLength(10)
        }
      }
    }
  },
  async asyncData({$axios}) {
    let charityDepartments = await $axios.get('/charity-departments')
    let religions = await $axios.get('/religions')
    let countries = await $axios.get('/countries');
    let educationDegrees = await $axios.get('/education-degrees');
    let maritalStatuses = await $axios.get('/marital-statuses');

    charityDepartments = charityDepartments.data.data.map(function (department) {
      return {
        'value': department.id,
        'label': department.title
      };
    });
    return {
      housingSituations: housingSituations,
      religions: religions.data.data,
      supervisorStatuses: supervisorStatuses,
      educationDegrees: educationDegrees.data.data,
      countries: countries.data.data,
      charityDepartments: charityDepartments,
      maritalStatuses: maritalStatuses.data.data,
    }
  },
  methods: {
    async submitHousehold() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitted = true
      } else {
        await this.$axios.post('/households', this.household)
          .then(value => this.$showSuccessfulToast())
          .catch(reason => {
            this.$showUnsuccessfulToast()
            console.log(reason.response)
          })

      }
    }
  },
  watch: {
    charityDepartment: function () {
      this.household.charity_department_id = this.charityDepartment.value
    },
    religion: function () {
      this.household.user.religion = this.religion.value
    },
    nationality: function () {
      this.household.user.citizenship = this.nationality.id
    },
    supervisorStatus: function () {
      this.household.supervisor_status = this.supervisorStatus.value
    },
    housingSituation: function () {
      this.household.housing_situation = this.housingSituation.value
    },
    maritalStatus: function () {
      this.household.user.marital_status = this.maritalStatus.value
    },
    education: function () {
      this.user.education = this.education.value
    }
  }
}
</script>
