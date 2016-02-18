# redux-saga approach:
This approach uses the [redux-saga](https://github.com/yelouafi/redux-saga) middleware.

redux-saga isolates side effects into Sagas.

A Saga is a kind of a daemon process which starts with your application. It watches dispatched
actions matching a specific pattern in order to decide what to do. For more infos on redux-saga see
http://yelouafi.github.io/redux-saga/

The solution defines 2 Sagas (defined in the `sagas/index.js` module)

- A *worker* Saga `fetchFriends` which handles the input query change logic (push into history,
  call Api, dispatch success action)
- A *watcher* Saga `rootSaga` which observes `SET_QUERY` actions and forks a new `fetchFriends`
task on each matching action.

The example handles the *concurrent actions* issue. If the user changes the query input while there is
still a pending request from a previous query change, the current pending request is cancelled and a new
request is made. It means we always get the result of the latest request.

The example also features *debouncing*. User input is denounced by 100ms : While `SET_QUERY`
actions are dispatched normally, the fetch doesn't occur until the user has stopped typing
after 100ms.


Finally, the example feature Saga monitoring using a slightly modified version of the sagaMonitor example
from the project examples repository. The monitor code can be found in the [`sagaMonitor/index`](sagaMonitor/index.js) module. You can
print a log of the Sagas activity by typing `$$LogSagas` into the console.

Like in the `better-observable` solution. URL changes are managed with react-router's (history's) browserHistory.listen() method

But while the above solution triggers the Side Effect from the browserHistory's callback (by dispatching a thunk). In the
redux-saga solution the callback only dispatches a `SET_QUERY` action which gets handled by the Saga (see [index.js](index.js#L16-L20)).

## To run
```sh
npm install
npm start
```
