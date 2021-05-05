export default (context, inject) => {
  const showToast = (message, title, variant = 'success', append = false) => $nuxt.$bvToast.toast(message, {
    title: title,
    autoHideDelay: 5000,
    appendToast: append,
    solid: true,
    variant: variant,
    toaster: 'b-toaster-bottom-left'
  })
  const showSuccessfulToast = () => showToast('عملیات با موفقیت همراه بود', 'ثبت اطلاعات')
  const showUnsuccessfulToast = () => showToast('عملیات با شکست همراه بود','ثبت اطلاعات', 'danger')
  inject('showToast', showToast)
  inject('showSuccessfulToast', showSuccessfulToast)
  inject('showUnsuccessfulToast', showUnsuccessfulToast)
}
