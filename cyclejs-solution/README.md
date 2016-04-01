# Cycle.js approach

This branch contains a Cycle.js solution that reuses most of the components defined for the redux apps, but uses RxJS for much simpler code. All effects in our system are also constrained to driver definitions, so we can be sure that all requests for fetching data come in through the input stream of our fetch driver and all history actions go through the history driver.

This also accomplishes the bonus objective of cancelling search requests by using an Observable for the search call, and `flatMapLatest` to only use the newest non-resolved query.

## To run
```sh
npm install
npm start
```
