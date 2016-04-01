import search from '../api'
export default query$ => query$.map(search).switch()
