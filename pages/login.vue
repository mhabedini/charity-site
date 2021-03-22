<script>
import {email, required} from "vuelidate/lib/validators";

/**
 * Login component
 */
export default {
  data() {
    return {
      email: "admin@admin.com",
      password: "admin",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
    };
  },
  computed: {
    notification() {
      return this.$store ? this.$store.state.notification : null;
    },
    notificationAutoCloseDuration() {
      return this.$store && this.$store.state.notification ? 5 : 0;
    },
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    },
  },
  methods: {
    async attemptLogin() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
      } catch (err) {
        console.log(err.response)
      }
    }
  },
  layout: 'auth'
}
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6 col-xl-5">
      <div class="card">
        <div class="card-body p-4">
          <div class="text-center w-75 m-auto">
            <div class="auth-logo">
              <nuxt-link to="/" class="logo logo-dark text-center">
                            <span class="logo-lg">
                                <img src="~/assets/images/logo-dark.png" alt="" height="30">
                            </span>
              </nuxt-link>

              <nuxt-link to="/" class="logo logo-light text-center">
                            <span class="logo-lg">
                                <img src="~/assets/images/logo-light.png" alt="" height="30">
                            </span>
              </nuxt-link>
            </div>
            <p class="text-muted mb-4 mt-3"> پست الکترونیک و رمز عبور خود را وارد کنید تا وارد پنل خود شوید</p>
          </div>

          <form action="#" @submit.prevent="attemptLogin">
            <b-alert :variant="notification.type" class="mt-3" v-if="notification.message"
                     :show="notificationAutoCloseDuration" dismissible>{{ notification.message }}
            </b-alert>

            <b-alert variant="danger" class="mt-3" v-model="isAuthError" :show="notificationAutoCloseDuration"
                     dismissible>{{ authError }}
            </b-alert>
            <div class="form-group mb-3">
              <label for="emailaddress">پست الکترونیک</label>
              <input class="form-control" v-model="email" type="email" id="emailaddress"
                     :class="{ 'is-invalid': submitted && $v.email.$error }">
              <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                <span v-if="!$v.email.required">پست الکترونیک صحیح لازم است</span>
                <span v-if="!$v.email.email">لطفا یک پست الکترونیک صحیح وارد کنید</span>
              </div>
            </div>

            <div class="form-group mb-3">
              <label for="password">رمز عبور</label>
              <div class="input-group input-group-merge">
                <input v-model="password" type="password" id="password" class="form-control"
                       :class="{ 'is-invalid': submitted && $v.password.$error }">

                <div class="input-group-append" data-password="false">
                  <div class="input-group-text">
                    <span class="password-eye"></span>
                  </div>
                </div>
                <div v-if="submitted && !$v.password.required" class="invalid-feedback">رمز عبور مورد نیاز است</div>
              </div>
            </div>

            <div class="form-group mb-3">
              <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="checkbox-signin" checked>
                <label class="custom-control-label" for="checkbox-signin">مرا به خاطر بسپار</label>
              </div>
            </div>

            <div class="form-group mb-0 text-center">
              <button class="btn btn-primary btn-block" type="submit">ورود به پنل</button>
            </div>

          </form>

        </div> <!-- end card-body -->
      </div>
      <!-- end card -->

      <div class="row mt-3">
        <div class="col-12 text-center">
          <p>
            <nuxt-link to="/account/forgot-password" class="text-muted ml-1">رمز عبور خود را فراموش کرده اید</nuxt-link>
          </p>
          <p v-if="false" class="text-muted">Don't have an account?
            <nuxt-link to="/account/register" class="text-primary font-weight-medium ml-1">Sign Up</nuxt-link>
          </p>
        </div> <!-- end col -->
      </div>
      <!-- end row -->

    </div> <!-- end col -->
  </div>
  <!-- end row -->
</template>
