import {input} from '@motorcycle/dom'

function view(query$) {
  return query$.map(value =>
    input('#search-input', {
      static: true,
      props: {value, type: 'search'},
    })
  )
}

function SearchInput({DOM, history}) {
  const searchValue$ = DOM.select('#search-input')
    .events('input')
    .map(evt => evt.target.value)

  return {
    DOM: view(history.map(({query: {q}}) => q ? q : '')),
    searchValue$,
  }
}

export default SearchInput
