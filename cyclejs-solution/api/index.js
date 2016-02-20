import { Observable } from 'rx';

import friends from './friends';

// mock api search
export default function search(query = '') {
  const results = friends.filter(friend => {
    let keep = false;

    Object.keys(friend).forEach(key => {
      const val = friend[key].toString();

      if (val.toLowerCase().includes(query.toLowerCase())) {
        keep = true;
      }
    });

    return keep;
  });

  // use an observable for our search API so that it's actually cancellable when we dispose of our subscription
  return Observable.create(observer => {
    const timeout = setTimeout(() => {
      console.log(`RESOLVING search ${timeout}`);
      observer.onNext(results)
    }, Math.ceil(100 + Math.random() * 250)); // make delay longer to make cancellation more obvious

    console.log(`STARTING search ${timeout}`);

    return () => {
      console.log(`DISPOSING search ${timeout}`);
      clearTimeout(timeout)
    };
  });
}
