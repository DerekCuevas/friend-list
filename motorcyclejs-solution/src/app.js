import {run} from '@motorcycle/core'
import {makeDOMDriver} from '@motorcycle/dom'
import {makeHistoryDriver, supportsHistory} from '@motorcycle/history'
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
