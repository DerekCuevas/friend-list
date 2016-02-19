# Cycle.js approach

This branch contains a Cycle.js solution that reuses most of the components defined for the redux apps, but uses RxJS for much simpler code. All effects in our system are also constrained to driver definitions, so we can be sure that all requests for fetching data come in through the input stream of our fetch driver and all history actions go through the history driver.

## To run
```sh
npm install
npm start
```
