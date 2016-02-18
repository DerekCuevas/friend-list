# redux-saga approach:
This approach uses the [redux-saga](https://github.com/yelouafi/redux-saga) middleware.

redux-saga isolates side effects into Sagas.

A Saga is a kind of a daemon process which starts with your application. It watches dispatched
actions matching a specific pattern in order to decide what to do.

The solution defines 2 Sagas

- A *worker* Saga `fetchFriends` which handles the input query change logic (push into history,
  call Api, dispatch success action)
- A *watcher* Saga `rootSaga` which observes `SET_QUERY` actions and forks a new `fetchFriends`
task on each matching action.

The example handles the *concurrent actions* issue. If the user changes the query input, while there is
still a pending request from a previous query change. The current pending request is cancelled and a new
request is made. It means we always get the result of the latest request.

The example also features *debouncing*. User input is denounced by 100ms : While `SET_QUERY`
actions are dispatched normally, the fetch doesn't occur until the user has stopped typing
after 100ms.



Like in the `better-observable` solution. URL changes are managed with react-router's (history's) browserHistory.listen() method

But while the above solution triggers the Side Effect from the browserHistory's callback (by dispatching a thunk). In the
redux-saga solution the callback only dispatches a `SET_QUERY` action which gets handled by the Saga.

## To run
```sh
npm install
npm start
```
