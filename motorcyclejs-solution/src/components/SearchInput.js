import {input} from '@motorcycle/dom'

const style = {
  position: 'absolute',
  zIndex: '1000',
  left: '25%',
  width: '50%',
}

function view(query$) {
  return query$.map(value =>
    input('#search-input', {
      static: true,
      props: {value, type: 'search'},
      style,
    })
  )
}

function SearchInput({DOM, history}) {
  const searchValue$ = DOM.select('#search-input')
    .events('input')
    .map(evt => evt.target.value)
    .debounce(100) // debounce 100 milliseconds 

  const query$ = history.map(({query: {q}}) => q || '')

  return {
    DOM: view(query$),
    searchValue$,
  }
}

export default SearchInput
