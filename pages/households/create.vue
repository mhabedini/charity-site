<template>
  <div>
    <PageHeader :title="title"/>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="submitHousehold" autocomplete="off">
          <div class="row">
            <div class="col-lg-6">

              <first-name :validation="this.$v.household.first_name"
                          :submitted="submitted"
                          v-model="household.first_name"/>

              <last-name :validation="this.$v.household.last_name"
                         :submitted="submitted"
                         v-model="household.last_name"/>

              <national-code :validation="this.$v.household.national_code"
                             :submitted="submitted"
                             v-model="household.national_code"/>

              <div class="form-group">
                <label>تاریخ تولد</label>
                <date-picker dir="rtl" v-model="household.birth_date" format="YYYY-MM-DD"
                             display-format="jYYYY-jMM-jDD"/>
              </div>

              <email :validation="this.$v.household.email"
                     :submitted="submitted"
                     v-model="household.email"/>

              <marital-status v-model="household.marital_status"/>

              <gender v-model="household.gender"/>

              <is-sadat v-model="household.is_sadat"/>
            </div>

            <div class="col-lg-6">

              <phone :submitted="submitted"
                     v-model="household.phone"
                     :validation="this.$v.household.phone"/>

              <Mobile :submitted="submitted"
                      v-model="household.mobile"
                      :validation="this.$v.household.mobile"/>

              <job v-model="household.job"/>

              <representative v-model="household.representative"/>

              <RepresentativeMobile :submitted="submitted"
                      v-model="household.representative_mobile"
                      :validation="this.$v.household.mobile"/>

              <charity-department-list v-model="charityDepartment" :charity-departments="charityDepartments"/>

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
import {
  required,
  email,
  minLength,
  maxLength
} from 'vuelidate/lib/validators';
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
import CharityDepartmentList from "@/components/inputs/CharityDepartmentList";
import RepresentativeMobile from "~/components/inputs/RepresentativeMobile";


export default {
  head() {
    return {
      title: `${this.title}`
    };
  },
  components: {
    RepresentativeMobile,
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
    IsSadat,
    CharityDepartmentList
  },
  data() {
    return {
      title: "ایجاد سرپرست جدید",
      household: {
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
        charity_department_id: null,
        citizenship: null,
        is_sadat: false,
        representative: null,
        representative_mobile: null,
      },
      charityDepartments: Array,
      charityDepartment: null,
      submitted: false,
    }
  },
  validations: {
    household: {
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
        required,
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
  async asyncData({$axios}) {
    let charityDepartments = await $axios.get('/charity-departments')
    charityDepartments = charityDepartments.data.data.map(function (department) {
      return {
        'value': department.id,
        'label': department.title
      };
    });
    return {
      charityDepartments: charityDepartments
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
    }
  }
}
</script>
