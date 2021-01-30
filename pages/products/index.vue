<script>
/**
 * Products-list component
 */
export default {
  head() {
    return {
      title: `${this.title}`,
    };
  },
  data() {
    return {
      products: Array,
      title: "لیست محصولات",
      items: [
        {
          text: "بازارشهر"
        },
        {
          text: "محصولات"
        },
        {
          text: "لیست محصولات",
          active: true
        }
      ],
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
          key: "name",
          label: "نام",
        },
        {
          key: "model",
          label: "مدل",
        },
        {
          key: "category",
          label: "دسته",
        },
        {
          key: "brand",
          label: "برند",
        },
        {
          key: "count",
          label: "تعداد انبار",
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
      this.getProducts();
    },
    getProducts() {
      this.productIsLoading = true
      this.products = []
      this.$axios.get(`/vendor/profile/products/products`, {
        params: {
          'per_page': this.perPage,
          'q': this.filter === null ? '' : this.filter,
          'page': this.currentPage
        }
      }).then(function (response) {
        this.totalRows = response.data.pagination.total
        this.products = response.data.data
        this.productIsLoading = false
      }.bind(this))
    }
  },
  async asyncData({$axios}) {
    const products = await $axios.get(`/vendor/profile/products/products?per_page=25`)
    return {
      products: products.data.data,
      totalRows: products.data.pagination.total
    }
  },
  watch: {
    filter: function () {
      this.getProducts()
    },
    currentPage: function () {
      this.getProducts()
    },
    perPage: function () {
      this.getProducts()
    }
  }
};
</script>

<template>
  <div>
    <PageHeader :title="title" :items="items"/>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row mb-2">
              <div class="col-sm-6">
                <nuxt-link to="/ecommerce/product-create" class="btn btn-danger mb-2"><i
                  class="mdi mdi-plus-circle mr-1"></i>افزودن محصول جدید
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
                    <b-form-select v-model="perPage" size="sm" :options="pageOptions"></b-form-select>&nbsp;محصول
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
                       :items="this.products"
                       :fields="fields" responsive="sm" :per-page="perPage"
                       :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
                <template v-slot:cell(check)="data">
                  <div class="custom-control custom-checkbox text-center">
                    <input type="checkbox" class="custom-control-input" :id="`contacusercheck${data.item.id}`"/>
                    <label class="custom-control-label" :for="`contacusercheck${data.item.id}`"></label>
                  </div>
                </template>

                <template v-slot:cell(name)="data">
                  <img v-if="data.item.image_src" :src="data.item.image_src" alt="" class="rounded mr-3" height="48"/>
                  <img v-else class="rounded m3" height="48" src="/images/product-placeholder.jpg"/>
                  <h5 class="m-0 d-inline-block align-middle">
                    <a href="#" class="text-dark">{{ data.item.name }}</a>
                  </h5>
                </template>
                <template v-if="false" v-slot:cell(status)="data">
                  <span class="badge badge-soft-success"
                        :class="{'badge-soft-danger': data.item.status === 'false'}">{{ data.item.status }}</span>
                </template>
                <template v-slot:cell(category)="data">
                  {{ data.item.category.name }}
                </template>
                <template v-slot:cell(brand)="data">
                  {{ data.item.brand.name }}
                </template>
                <template v-slot:cell(count)="data">
                  <span :class="{'badge-soft-danger': data.item.count === 0}">
                    {{ data.item.count === 0 ? 'ناموجود' : data.item.count }}
                  </span>

                </template>
                <template v-slot:cell(action)>
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
