export default function ({$axios, redirect}) {
  $axios.setHeader('Device-Id', 'Device-Id')
  $axios.setHeader('Device-Name', 'Device-Name')
  $axios.setHeader('Platform-Version', 'Platform-Version')
  $axios.setHeader('Platform', 'Platform')
  $axios.setHeader('Application-Version-Name', 'Application-Version-Name')
  $axios.setHeader('Application-Version-Code', 'Application-Version-Code')
  $axios.setHeader('Application-Id', 'Application-Id')
  $axios.setHeader('Application-Type', 'Application-Type')
  $axios.setHeader('Accept', 'application/json')
  $axios.setHeader('Content', 'application/json')

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 404) {
      console.log('404 error')
    }
  })
}
