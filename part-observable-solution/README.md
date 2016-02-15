# Part "observable" approach:
This solution takes advantage of redux's implementation of the 'observer pattern' and makes fetching results from the API (via dispatching the fetchFriends action) a side effect of updating the query.

Logic for dispatching these side effects are managed with redux's store.subscribe() (see - [index.js](index.js#L14)).

## To run
```sh
npm install
npm start
```
