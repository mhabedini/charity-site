export default function ({$axios}) {
  $axios.setHeader('Accept', 'application/json')
  $axios.setHeader('Content', 'application/json')
}
