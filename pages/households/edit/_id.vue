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

              <div class="form-group">
                <label>تاریخ تولد</label>
                <date-picker dir="rtl" v-model="household.user.birth_date" format="YYYY-MM-DD"
                             display-format="jYYYY-jMM-jDD"/>
              </div>

              <email :validation="this.$v.household.user.email"
                     :submitted="submitted"
                     v-model="household.user.email"/>

              <description v-model="household.description"/>

              <marital-status v-model="household.user.marital_status"/>

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

              <charity-department-list v-model="charityDepartment" :charity-departments="charityDepartments"/>

              <religion v-model="religion" :religions="religions"/>

              <charity-department-list v-model="charityDepartment" :charity-departments="charityDepartments"/>

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
import Email from "@/components/inputs/Email";
import MaritalStatus from "@/components/inputs/MaritalStatus";
import Gender from "@/components/inputs/Gender";
import Representative from "@/components/inputs/Representative";
import RepresentativeMobile from "@/components/inputs/RepresentativeMobile";
import Job from "@/components/inputs/Job";
import IsSadat from "@/components/inputs/IsSadat";
import CharityDepartmentList from "@/components/inputs/CharityDepartmentList";
import FatherName from "~/components/inputs/FatherName";
import Description from "~/components/inputs/Description";
import Religion from "@/components/inputs/Religion";


export default {
  head() {
    return {
      title: `${this.title}`
    };
  },
  components: {
    Multiselect,
    Religion,
    DatePicker,
    FirstName,
    FatherName,
    LastName,
    NationalCode,
    Phone,
    Mobile,
    Email,
    MaritalStatus,
    Gender,
    Representative,
    RepresentativeMobile,
    Job,
    IsSadat,
    CharityDepartmentList,
    Description,
  },
  data() {
    return {
      title: "ویرایش سرپرست",
      household: {
        charity_department_id: null,
        description: null,
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
          representative_mobile: null,
        }
      },
      charityDepartment: null,
      religion: null,
      religions: Array,
      charityDepartments: Array,
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
    let religions = await $axios.get('/religions')
    charityDepartments = charityDepartments.data.data.map(function (department) {
      return {
        'value': department.id,
        'label': department.title
      };
    });
    return {
      religions: religions.data.data,
      religion: religions.data.data.find(religion => religion.value === household.data.data.user.religion),
      charityDepartments: charityDepartments,
      charityDepartment: charityDepartments.find(charityDepartment => charityDepartment.value === household.data.data.charity_department_id),
      household: household.data.data
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
    religion: function () {
      this.household.user.religion = this.religion.value
    }
  }
}
</script>
