<script>
/**
 * charityDepartments-list component
 */
export default {
  head() {
    return {
      title: `${this.title}`,
    };
  },
  data() {
    return {
      charityDepartments: Array,
      title: "لیست موسسات خیریه",
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
          label: "آی دی"
        },
        {
          key: "title",
          label: "نام موسسه خیریه",
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
      this.getCharityDepartments();
    },
    getCharityDepartments() {
      this.productIsLoading = true
      this.charityDepartments = []
      this.$axios.get(`/charity-departments`, {
        params: {
          'per_page': this.perPage,
          'q': this.filter === null ? '' : this.filter,
          'page': this.currentPage
        }
      }).then(function (response) {
        this.totalRows = response.data.pagination.total
        this.charityDepartments = response.data.data
        this.productIsLoading = false
      }.bind(this))
    }
  },
  async asyncData({$axios}) {
    const charityDepartments = await $axios.get(`/charity-departments?per_page=25`)
    return {
      charityDepartments: charityDepartments.data.data,
      totalRows: charityDepartments.data.pagination.total
    }
  },
  watch: {
    filter: function () {
      this.getCharityDepartments()
    },
    currentPage: function () {
      this.getCharityDepartments()
    },
    perPage: function () {
      this.getCharityDepartments()
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
                <nuxt-link to="/ecommerce/product-create" class="btn btn-danger mb-2"><i
                  class="mdi mdi-plus-circle mr-1"></i>افزودن موسسه خیریه جدید
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
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;موسسه خیریه
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
                       :items="this.charityDepartments"
                       :fields="fields" responsive="sm" :per-page="perPage"
                       :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">

                <template v-slot:cell(action)="data">
                  <ul class="list-inline table-action m-0">
                    <li class="list-inline-item">
                      <a href="javascript:void(0);" class="action-icon">
                        <i class="mdi mdi-eye"></i></a>
                    </li>
                    <li class="list-inline-item">
                      <nuxt-link :to="`/charity-departments/edit/${ data.item.id }`" class="action-icon">
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
