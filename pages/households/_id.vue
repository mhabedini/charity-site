<template>
  <div>
    <PageHeader :title="title"/>
    <div class="row">
      <div class="col-lg-3">
        <b-list-group>
          <h4 class="mb-3">اطلاعات هویتی</h4>
          <b-list-group-item>نام: <span>{{ user.first_name }}</span></b-list-group-item>
          <b-list-group-item>نام پدر: <span>{{ user.father_name }}</span></b-list-group-item>
          <b-list-group-item>نام خانوادگی : <span>{{ user.last_name }}</span></b-list-group-item>
          <b-list-group-item>پست الکترونیک : <span>{{ user.email }}</span></b-list-group-item>
          <b-list-group-item>جنسیت : <span>{{ user.gender === 'male' ? 'مرد' : 'زن' }}</span></b-list-group-item>
          <b-list-group-item>کد ملی : <span>{{ user.national_code }}</span></b-list-group-item>
          <b-list-group-item v-if="this.user.birth_date">تاریخ تولد : <span>{{ user.birth_date }}</span>
          </b-list-group-item>
          <b-list-group-item v-if="this.user.mobile">شماره همراه : <span>{{ user.mobile }}</span></b-list-group-item>
          <b-list-group-item v-if="this.user.phone">شماره تلفن : <span>{{ user.phone }}</span></b-list-group-item>
          <b-list-group-item>وضعیت تأهل : <span>{{ user.marital_status ? 'متأهل' : 'مجرد' }}</span></b-list-group-item>
          <b-list-group-item v-if="this.user.job">شغل : <span></span>{{ user.job }}</b-list-group-item>
          <b-list-group-item>آیا کاربر سید هست؟ : <span>{{ user.is_sadat ? 'بله' : 'خیر' }}</span></b-list-group-item>
          <b-list-group-item v-if="this.user.representative">معرف : <span>{{ user.representative }}</span>
          </b-list-group-item>
          <b-list-group-item v-if="this.user.representative_mobile">شماره معرف : <span>{{
              user.representative_mobile
            }}</span>
          </b-list-group-item>
        </b-list-group>

        <b-list-group v-if="this.household.charity_department">
          <h4 class="mt-4 mb-3">اطلاعات موسسه خیریه</h4>
          <b-list-group-item>نام موسسه خیریه: <span>{{ charityDepartment.title }}</span></b-list-group-item>
        </b-list-group>

      </div>

      <div class="col-lg-9">
        <div class="row">
          <div class="col-sm-6">
            <h4 class="">اعضای خانواده</h4>
          </div>
          <div class="col-sm-6">
            <nuxt-link :to="`/households/${household.id}/family-member/create`"
                       class="btn mb-3 float-sm-right btn-danger mb-2"><i
              class="mdi mdi-plus-circle mr-1"></i>افزودن عضو خانواده جدید
            </nuxt-link>
          </div>
        </div>
        <div class="card">
          <span class="table-responsive mb-0">
              <b-table table-class="table table-centered w-100" thead-tr-class="bg-light"
                       :items="this.families"
                       :fields="fields" responsive="sm" :per-page="perPage"
                       :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">


                <template v-slot:cell(gender)="data">
                  {{ data.item.gender === 'male' ? 'مرد' : 'زن' }}
                </template>
                <template v-slot:cell(action)="data">
                  <ul class="list-inline table-action m-0">
                    <li class="list-inline-item">
                      <a href="javascript:void(0);" class="action-icon">
                        <i class="mdi mdi-eye"></i></a>
                    </li>
                    <li class="list-inline-item">
                      <a href="javascript:void(0);" class="action-icon">
                        <i class="mdi mdi-square-edit-outline"></i></a>
                    </li>
                    <li class="list-inline-item">
                      <a href="javascript:void(0);" class="action-icon">
                        <i class="mdi mdi-delete"></i></a>
                    </li>
                  </ul>
                </template>
              </b-table>

            </span>
        </div>

        <div class="card">
          <div class="card-body">

            <div class="row">
              <div class="col-md-2 mt-2" v-for="attachment in attachments">
                <img class="img-thumbnail" :src="attachment.path">
              </div>
            </div>

            <h4 class="header-title mt-4">محل ذخیره فایلهای سرپرست</h4>
            <!-- file upload -->
            <vue-dropzone id="dropzone" ref="myVueDropzone"
                          v-on:vdropzone-success="successfulUpdate"
                          :use-custom-slot="true" :options="dropzoneOptions">
              <div class="dz-message needsclick">
                <i class="h1 text-muted ri-upload-cloud-2-line"></i>
                <h3>فایل خود را اینجا رها کنید و یا برای انتخاب فایل کلیک کنید</h3>
              </div>
            </vue-dropzone>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';

export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  head() {
    return {
      title: `${this.title}`
    };
  },
  data() {
    return {
      title: "نمایش سرپرست",
      household: Object,
      user: Object,
      charityDepartment: Object,
      attachments: Array,
      families: Array,
      totalRows: 1,
      currentPage: 1,
      productIsLoading: false,
      perPage: 25,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: "name",
      sortDesc: false,
      fields: [
        {
          key: "user.id",
          label: "ردیف"
        },
        {
          key: "user.first_name",
          label: "نام",
        },
        {
          key: "user.last_name",
          label: "نام خانوادگی",
        },
        {
          key: "user.email",
          label: "پست الکترونیک",
        },
        {
          key: "user.gender",
          label: "جنسیت",
        },
        {
          key: "user.national_code",
          label: "کد ملی",
        },
        {
          key: "user.phone",
          label: "تلفن",
        },
        {
          key: "user.mobile",
          label: "همراه",
        },
        {
          key: "user.national_code",
          label: "کد ملی",
        },
        {
          key: "action",
          label: "عملیات"
        }
      ],
      dropzoneOptions: {
        url: `http://api.localhost/v1/households/${this.$route.params.id}/attachments`,
        thumbnailWidth: 150,
        maxFilesize: 4,
        headers: {
          'Authorization': this.$auth.$storage._state['_token.local']
        },
        previewTemplate: this.template(),
      },
    };
  },
  async asyncData({$axios, params}) {
    const household = await $axios.get(`/households/${params.id}`)
    return {
      household: household.data.data,
      user: household.data.data.user,
      attachments: household.data.data.attachments,
      charityDepartment: household.data.data.charity_department,
      families: household.data.data.families
    }
  },
  mounted() {
    this.user.birth_date = this.user.birth_date ? this.user.birth_date.split('T')[0] : null
  },
  methods: {
    successfulUpdate: function (file, response) {
      this.$refs.myVueDropzone.removeFile(file);
      this.attachments.push(response.data);
    },
    template: function () {
      return ` <div class="dropzone-previews mt-3">
            <div class="card mt-1 mb-0 shadow-none border">
                <div class="p-2">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <img data-dz-thumbnail src="#" class="avatar-sm rounded bg-light" alt="">
                        </div>
                        <div class="col pl-0">
                            <a href="javascript:void(0);" class="text-muted font-weight-bold" data-dz-name></a>
                            <p class="mb-0" data-dz-size></p>
                        </div>
                        <div class="col-auto">
                            <!-- Button -->
                            <a href="" class="btn btn-link btn-lg text-muted" data-dz-remove>
                                <i class="fe-x"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }
  }
}
</script>
