import {Observable} from 'rx'
import {div, hr} from 'cycle-snabbdom'

import SearchInput from './components/SearchInput'
import FriendList from './components/FriendList'

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

function view(searchInput, friendList) {
  return div('.app', {style}, [
    searchInput,
    friendList,
  ])
}

function main(sources) {
  const searchInput = SearchInput(sources)

  const view$ = Observable.combineLatest(
    searchInput.DOM,
    FriendList(sources.fetch),
    view
  )

  return {
    DOM: view$,
    history: searchInput.searchValue$.map(q => q && {query: {q}} || '/' ),
    fetch: sources.history.map(({query}) => query.q),
  }
}

export default main
