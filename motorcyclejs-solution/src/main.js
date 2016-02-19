import {combine} from 'most'
import {div} from '@motorcycle/dom'

import SearchInput from './components/SearchInput'
import FriendList from './components/FriendList'

function view(searchInput, friendList) {
  return div('.app', [
    searchInput,
    friendList,
  ])
}

function main(sources) {
  const searchInput = SearchInput(sources)

  const view$ = combine(
    view,
    searchInput.DOM,
    FriendList(sources.fetch)
  )

  return {
    DOM: view$,
    history: searchInput.searchValue$.map(q => ({query: {q}})),
    fetch: sources.history.map(({query}) => query.q),
  }
}

export default main
