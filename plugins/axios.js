export default function ({$axios}) {
  $axios.setHeader('Accept', 'application/json')
  $axios.setHeader('Content', 'application/json')

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 404) {
      console.log('404 error')
    }
  })
}
