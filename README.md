# Friend List
A non-trivial (yet simple) redux + react-router example.

![alt tag](friendlist.gif)

## The Problem
Create an app with a dynamic and searchable list of data that keeps a search input text query in sync with the URL via a query parameter at all times. Assume the data will be fetched from some API and the API will perform the actual search. The query should be a simple string and kept in sync with the URL via a query parameter 'q' (ex. localhost:3000/?q=batman).

This problem is harder than it first appears, actions must be managed in the correct order, and if not can result in infinite loops and other undesirable behavior.

## The Spec
- Hit the API **once and only once** per query change.
- When the query updates -> update the URL and fetch results from the API.
- When the URL updates -> update the query and fetch results from the API.
- The browser's back / forward buttons should keep the app state (query + results) in sync with the URL (this is a gotcha if not thought about carefully).
- No optimizations (like cacheing previous queries) should be made, however the app should not be designed in a way that prevents this.

## Solutions
Currently there are three solutions (each in their own subdirectories - see explanations below).

Each of the three have similar structure (identical store state + hitting the same mock API). The differences being when and where the app reads router state and when and where the app dispatches actions.

Refer to \*/index.js and \*/containers/FriendSearchView.js for differences in the approaches.

### To run
First clone the repo.

```sh
git clone https://github.com/DerekCuevas/friend-list.git
```

Then cd into an example, 'npm install' and 'npm start' to get going.

```sh
cd friend-list/imperative-solution/ # or the others
npm install
npm start
```

### The solutions

#### Basic approach:
Currently the most straightforward of the three, logic for dispatching actions and reading router state is all contained in react components. (full solution - [/imperative-solution](imperative-solution/))

#### Part "observable" approach:
This solution takes advantage of redux's implementation of the 'observer pattern' and makes fetching results from the API (via dispatching the fetchFriends action) a side effect of updating the query. Logic for dispatching these side effects are managed with redux's store.subscribe() (see - [index.js](part-observable-solution/index.js#L14)). (full solution - [/part-observable-solution](part-observable-solution/))

#### Extended "observable" approach:
This approach builds on the patterns used in the part "observable" approach. Dispatching side effects of updating the URL are managed with react-router's (history's) browserHistory.listen() method. (see - [index.js](better-observable-solution/index.js#L28)) (full solution - [/better-observable-solution](better-observable-solution/))

#### Others
Please send in a pull request if you have a better solution.
