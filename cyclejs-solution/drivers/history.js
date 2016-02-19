import { browserHistory } from 'react-router';
import { ReplaySubject } from 'rx';

export default function historyDriver(userQuery$) {
  const newQuery$ = new ReplaySubject(1);

  userQuery$.subscribe(query => {
    browserHistory.push({
      query: { q: query || undefined }
    });
  });

  browserHistory.listen(location => {
    if (location.action === 'POP') {
      newQuery$.onNext(location.query.q);
    }
  });

  return newQuery$;
}
