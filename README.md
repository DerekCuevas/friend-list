# Friend List (this is a draft)
A non-trivial (yet simple) demo of redux + react-router.

## The Problem
Create an app with a dynamic, searchable list of data. Keep the search query in sync with the URL via a query parameter at all times. Assume the data will be fetched from some API and the API will perform the actual search. The query should be a simple string and kept in sync with the URL via a query param 'q' (ex. localhost:3000/?q=batman)

This problem is harder than it first appears, actions must be managed in the correct order, and if not can result in infinite loops and other undesirable behavior.

## The Spec
- Hit the API **once and only once** per query change (carefull here)
- When the query updates -> update the URL (do this with the query param 'q')
- When the URL updates -> update the query (ex. someone sends you a link)
- The browser's back / forward buttons should keep the app state (query + results) in sync with the URL (this is a gotcha if not thought about carefully).
- No optimizations (like cacheing previous queries) should be made, however the app should not be designed in a way that prevents this.

## Solutions
