import {of} from 'most'
import {holdSubject} from 'most-subject'

import search from '../api'

function fetchDriver(query$) {
  const {observer, stream} = holdSubject()

  query$.observe(query => search(query, friend => observer.next(of(friend))))

  return stream.switch() // cancels previous requests
}

export default fetchDriver
