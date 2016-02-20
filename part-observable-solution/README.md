# Part "observable" approach:
This solution takes advantage of redux's implementation of the 'observer pattern' and makes fetching results from the API (via dispatching the fetchFriends action) a side effect of updating the query.

Logic for dispatching these side effects are managed with redux's store.subscribe() (see - [index.js](index.js#L15)).

Refer to \*/index.js and \*/containers/FriendSearchView.js for the difference in approach between this example, the [imperative-solution](../imperative-solution), and the [better-observable-solution](../better-observable-solution).

## To run
```sh
npm install
npm start
```
