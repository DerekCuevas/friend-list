import { ReplaySubject } from 'rx';

import search from '../api';

export default function fetchDriver(query$) {
  const friends$ = new ReplaySubject(1);

  query$.subscribe(query => {
    search(query, friends => {
      friends$.onNext(friends);
    });
  });

  return friends$
}
