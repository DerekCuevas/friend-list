import search from '../api';

export default function fetchDriver(query$) {
  // for each query item, create a new observable to pass downstream
  // our search observable will be active until the next query comes in,
  // when we will unsubscribe and dispose of the previous search observable
  return query$.flatMapLatest(x => search(x));
}
