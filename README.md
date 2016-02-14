# Friend List (this is a draft)
A non-trivial (yet simple) redux + react-router example.

## The Problem
Create an app with a dynamic and searchable list of data that keeps a search input text query in sync with the URL via a query parameter at all times. Assume the data will be fetched from some API and the API will perform the actual search. The query should be a simple string and kept in sync with the URL via a query parameter 'q' (ex. localhost:3000/?q=batman).

This problem is harder than it first appears, actions must be managed in the correct order, and if not can result in infinite loops and other undesirable behavior.

## The Spec
- Hit the API **once and only once** per query change
- When the query updates -> update the URL and fetch results from the API
- When the URL updates -> update the query and fetch results from the API
- The browser's back / forward buttons should keep the app state (query + results) in sync with the URL (this is a gotcha if not thought about carefully).
- No optimizations (like cacheing previous queries) should be made, however the app should not be designed in a way that prevents this.

## Solutions
Currently there are three solutions (each in separate subdirectories of this repo).

#### Imperative approach:
Currently the most straightforward of the three, logic for dispatching actions and reading router state is all contained in react components.

#### Part "observable" approach:
This solution makes fetching results from the API (via dispatching the fetchFriends action) a side effect of updating the query. Logic for dispatching these side effects are managed with redux's store.subscribe() in an 'observable' like pattern.

#### Extended "observable" approach:
Logic for both dispatching side effects to the store and reading router state are moved outside of react components. This example uses both redux's store.subscribe() and react-router's (history) browserHistory.listen() methods.

#### Others
Please send in a PR if you have a better solution.

<!--
## Highlights
- vanilla redux + react-router, no third party bindings (like react-router-redux) (why is this a highlight?)
- managing side effect's with redux's store.subscribe()
- dispatching outside of react components
- pushing all other side effects (hitting the API, updating the URL) to action creators
- use of history's 'location descriptor object'
-->
