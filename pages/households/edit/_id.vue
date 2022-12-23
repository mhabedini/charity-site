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
            <button class="btn btn-primary" type="submit">ویرایش سرپرست</button>
          </div>
        </form>
        <!-- end card-box -->
      </div>
      <!-- end col -->
    </div>
  </div>
</template>

<script>
import {email, maxLength, minLength, required} from 'vuelidate/lib/validators'
import Multiselect from 'vue-multiselect'
import DatePicker from 'vue-persian-datetime-picker'
import FirstName from "@/components/inputs/FirstName";
import LastName from "@/components/inputs/LastName";
import NationalCode from "@/components/inputs/NationalCode";
import Phone from "@/components/inputs/Phone";
import Mobile from "@/components/inputs/Mobile";
import Dropdown from "@/components/inputs/Dropdown";
import Email from "@/components/inputs/Email";
import Gender from "@/components/inputs/Gender";
import Representative from "@/components/inputs/Representative";
import RepresentativeMobile from "@/components/inputs/RepresentativeMobile";
import Job from "@/components/inputs/Job";
import IsSadat from "@/components/inputs/IsSadat";
import FatherName from "~/components/inputs/FatherName";
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
    Multiselect,
    Citizenship,
    DatePicker,
    FirstName,
    FatherName,
    Dropdown,
    LastName,
    NationalCode,
    Phone,
    Mobile,
    Email,
    Gender,
    Representative,
    RepresentativeMobile,
    Job,
    IsSadat,
    Description,
  },
  data() {
    return {
      title: "ویرایش سرپرست",
      household: {
        supervisor_status: null,
        charity_department_id: null,
        description: null,
        housing_situation: null,
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
          education: null,
          citizenship: null,
          representative: null,
          representative_mobile: null,
        }
      },
      charityDepartment: null,
      religion: null,
      religions: Array,
      nationality: null,
      countries: Array,
      charityDepartments: Array,
      housingSituation: null,
      housingSituations: Array,
      supervisorStatus: null,
      supervisorStatuses: Array,
      maritalStatus: null,
      education: null,
      educationDegrees: Array,
      maritalStatuses: Array,
      submitted: false,
    }
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
  async asyncData({$axios, params}) {
    const household = await $axios.get(`/households/${params.id}`)
    let charityDepartments = await $axios.get('/charity-departments')
    let countries = await $axios.get('/countries');
    let religions = await $axios.get('/religions')
    let educationDegrees = await $axios.get('/education-degrees');
    let maritalStatuses = await $axios.get('/marital-statuses');
    charityDepartments = charityDepartments.data.data.map(function (department) {
      return {
        'value': department.id,
        'label': department.title
      };
    });
    return {
      religions: religions.data.data,
      housingSituations: housingSituations,
      housingSituation: housingSituations.find(housingSituation => housingSituation.value === household.data.data.housing_situation),
      supervisorStatuses: supervisorStatuses,
      supervisorStatus: supervisorStatuses.find(supervisorStatus => supervisorStatus.value === household.data.data.supervisor_status),
      religion: religions.data.data.find(religion => religion.value === household.data.data.user.religion),
      nationality: countries.data.data.find(nationality => nationality.id === household.data.data.user.citizenship),
      countries: countries.data.data,
      charityDepartments: charityDepartments,
      charityDepartment: charityDepartments.find(charityDepartment => charityDepartment.value === household.data.data.charity_department_id),
      education: educationDegrees.data.data.find(degree => degree.value === household.data.data.user.education),
      educationDegrees: educationDegrees.data.data,
      household: household.data.data,
      maritalStatus: maritalStatuses.data.data.find(maritalStatus => maritalStatus.value === household.data.data.user.marital_status),
      maritalStatuses: maritalStatuses.data.data,
    }
  },
  methods: {
    async submitHousehold() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitted = true
      } else {
        await this.$axios.patch(`/households/${this.$route.params.id}`, this.household)
          .then(value => this.$showSuccessfulToast())
          .catch(reason => {
            this.$showUnsuccessfulToast()
            console.log(reason.response.data)
          })
      }
    }
  },
  mounted() {
    this.household.user.birth_date = this.household.user.birth_date ? this.household.user.birth_date.split('T')[0] : null;
  },
  watch: {
    charityDepartment: function () {
      this.household.charity_department_id = this.charityDepartment.value
    },
    nationality: function () {
      this.household.user.citizenship = this.nationality.id
    },
    housingSituation: function () {
      this.household.housing_situation = this.housingSituation.value
    },
    supervisorStatus: function () {
      this.household.supervisor_status = this.supervisorStatus.value
    },
    religion: function () {
      this.household.user.religion = this.religion.value
    },
    maritalStatus: function () {
      this.household.user.marital_status = this.maritalStatus.value
    },
    education: function () {
      this.household.user.education = this.education.value
    }
  }
}
</script>
