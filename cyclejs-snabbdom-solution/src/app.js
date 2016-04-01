import {run} from '@cycle/core'
import {makeDOMDriver} from 'cycle-snabbdom'
import {makeHistoryDriver, supportsHistory} from '@cycle/history'
import {createHistory, createHashHistory, useQueries} from 'history'

import fetchDriver from './drivers/fetch'

import main from './main'

const history = supportsHistory() ?
  useQueries(createHistory)() :
  useQueries(createHashHistory)()

run(main, {
  DOM: makeDOMDriver('.container'),
  history: makeHistoryDriver(history),
  fetch: fetchDriver,
})
