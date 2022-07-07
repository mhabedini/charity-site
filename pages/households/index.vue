<script>
/**
 * households-list component
 */
export default {
  head() {
    return {
      title: `${this.title}`,
    };
  },
  data() {
    return {
      households: Array,
      title: "لیست سرپرستان",
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
          key: "id",
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
          key: "gender",
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
          key: "charity_department.title",
          label: "موسسه خیریه",
        },
        {
          key: "action",
          label: "عملیات"
        }
      ]
    };

  },
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return this.totalRows;
    }
  },
  methods: {
    async sortChanged(e) {
      this.getHouseHolds();
    },
    getHouseHolds() {
      this.productIsLoading = true
      this.households = []
      this.$axios.get(`/households`, {
        params: {
          'per_page': this.perPage,
          'q': this.filter === null ? '' : this.filter,
          'page': this.currentPage
        }
      }).then(function (response) {
        this.totalRows = response.data.pagination.total
        this.households = response.data.data
        this.productIsLoading = false
      }.bind(this))
    }
  },
  async asyncData({$axios}) {
    const households = await $axios.get(`/households?per_page=25`)
    return {
      households: households.data.data,
      totalRows: households.data.pagination.total
    }
  },
  watch: {
    filter: function () {
      this.getHouseHolds()
    },
    currentPage: function () {
      this.getHouseHolds()
    },
    perPage: function () {
      this.getHouseHolds()
    }
  }
};
</script>

<template>
  <div>
    <PageHeader :title="title"/>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-sm-6">
                <nuxt-link to="/households/create" class="btn btn-danger mb-2"><i
                  class="mdi mdi-plus-circle mr-1"></i>افزودن سرپرست جدید
                </nuxt-link>
              </div>
              <div class="col-sm-6">
                <div class="float-sm-right">
                  <button type="button" class="btn btn-success mb-2 mb-sm-0"><i class="mdi mdi-cog"></i></button>
                </div>
              </div><!-- end col-->
            </div>
            <div class="row mb-2">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
                    نمایش&nbsp;
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;سرپرست
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_filter" class="dataTables_filter text-md-right">
                  <label class="d-inline-flex align-items-center">
                    جستجو:
                    <b-form-input debounce="1000" v-model="filter" type="search" placeholder="متن جستجو..."
                                  class="form-control form-control-sm ml-2"></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>

            <!-- Table -->
            <span class="table-responsive mb-0">

              <b-table table-class="table table-centered w-100" @sort-changed="sortChanged" thead-tr-class="bg-light"
                       :items="this.households"
                       :fields="fields" responsive="sm" :per-page="perPage"
                       :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">

                <template v-slot:cell(gender)="data">
                  {{ data.item.user.gender === 'male' ? 'مرد' : 'زن' }}
                </template>
                <template v-slot:cell(action)="data">
                  <ul class="list-inline table-action m-0">
                    <li class="list-inline-item">
                      <nuxt-link :to="`/households/${ data.item.id }`" class="action-icon">
                        <i class="mdi  mdi-eye"></i>
                      </nuxt-link>
                    </li>
                    <li class="list-inline-item">
                      <nuxt-link :to="`/households/edit/${ data.item.id }`" class="action-icon">
                        <i class="mdi mdi-square-edit-outline"></i></nuxt-link>
                    </li>
                    <li class="list-inline-item">
                      <a href="javascript:void(0);" class="action-icon">
                        <i class="mdi mdi-delete"></i></a>
                    </li>
                  </ul>
                </template>
              </b-table>

            </span>
            <div v-if="this.productIsLoading" class="row mb-2">
              <div class="col-12 text-center">
                <b-spinner type="grow" class="m-2" variant="primary" role="status"></b-spinner>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="dataTables_paginate paging_simple_numbers float-right">
                <ul class="pagination pagination-rounded">
                  <!-- pagination -->
                  <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage"></b-pagination>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
