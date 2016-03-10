# Better "observable" approach:
This approach builds on the patterns used in the part "observable" approach, with significant simplifications being made to the react container components.

Dispatching side effects of updating the URL (via the browser's back/forward buttons) are managed with [history's](https://github.com/mjackson/history) history.listen() method.

```javascript
history.listen(location => {
  if (location.action === 'POP') {
    store.dispatch(setQuery(location.query.q));
  }
});
```
(see - [index.js](index.js#L36))

The solution doesn't need react-router as none of the react components need to read router state. Compare this with the part-observable-solution's container component [FriendSearchView](../part-observable-solution/containers/FriendSearchView.js) where 'componentDidMount' and 'componentWillReceiveProps' are needed to implement query changes on route transitions.

## Bonus Features
This solution solves the bonus problem of handling the concurrent actions issue. It does so using [redux-thunk](https://github.com/gaearon/redux-thunk), however instead of cancelling requests the solution ignores responses that would put the store (query + results) in an inconsistent state.

```javascript
export function fetchFriends(history) {
  return (dispatch, getState) => {
    const { query } = getState();

    dispatch(requestFriends());

    search(query).then(friends => {
      const { query: currentQuery } = getState();

      if (query === currentQuery) {
        history.push({
          query: { q: query || undefined }
        });

        dispatch(receiveFriends(friends));
      }
    });
  };
}
```
(see - [actions/index.js](actions/index.js#L24))

The disposing of responses ensures a consistent state between the current query and the current results. This state can occur when responses arrive in a different order than they were requested. (This is mocked by setting a random timeout in the mock api [search function](api/index.js#L22).)

Also, a loading state is added to the store. The friendList react component will show a loading state when isFetching === true. (see - [components/FriendList.js](components/FriendList.js))

Finally, this solution debounces fetching of friends from the mock API by 100ms. It does so by binding dispatch to the fetchFriends action.

```javascript
const fetch = debounce(
  store.dispatch.bind(undefined, fetchFriends(history)),
  100
);
```
(see - [index.js](index.js#L20))

Refer to \*/index.js and \*/containers/FriendSearchView.js for the difference in approach between this example, the [part-observable-solution](../part-observable-solution), and the [imperative-solution](../imperative-solution).

## To run
```sh
npm install
npm start
```
