# Better "observable" approach:
This approach builds on the patterns used in the part "observable" approach, with significant simplifications being made to the react container components. The URL is now being observed in a way similar to the store.

Dispatching side effects of updating the URL are managed with [history's](https://github.com/reactjs/history) history.listen() method. (see - [index.js](index.js#L36))

The solution doesn't need react-router as none of the react components need to read router state. Compare this with the part-observable-solution's container component [FriendSearchView](../part-observable-solution/containers/FriendSearchView.js) where 'componentDidMount' and 'componentWillReceiveProps' are needed to implement query changes on route transitions.

This solution also solves the bonus problem of handling the concurrent actions issue. It does so using [redux-thunk](https://github.com/gaearon/redux-thunk), however instead of cancelling requests the solution ignores responses that would put the store (query + results) in an inconsistent state. see here - [actions/index.js](actions/index.js#L23)

Finally, this solution also debounces fetching of friends from the mock API by 100ms, see here - [index.js](index.js#L20).

Refer to \*/index.js and \*/containers/FriendSearchView.js for the difference in approach between this example, the [part-observable-solution](../part-observable-solution), and the [imperative-solution](../imperative-solution).

## To run
```sh
npm install
npm start
```
