# Better "observable" approach:
This approach builds on the patterns used in the part "observable" approach. The URL is observed in a similar way that the store is observed.

Dispatching side effects of updating the URL are managed with react-router's (history's) browserHistory.listen() method. (see - [index.js](index.js#L29))

Refer to \*/index.js and \*/containers/FriendSearchView.js for the difference in approach between this example, the [part-observable-solution](../part-observable-solution), and the [imperative-solution](../imperative-solution).

## To run
```sh
npm install
npm start
```
