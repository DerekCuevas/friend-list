import { CANCEL } from 'redux-saga/utils';
import friends from './friends';

// mock api search
export default function search(query, callback) {
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

  // setting a more realistic (random) timeout
  let tid
  console.log(`api/search: STARTING QUERY '${query}'`)
  const promise = new Promise((resolve) => {
    tid = setTimeout(() => {
      console.log(`api/search: RESOLVING QUERY '${query}'`)
      resolve(results)
    }, Math.ceil(Math.random() * 250)); // make the delay longer to make cancellation happen often
  });

  promise[CANCEL] = () => {
    console.log(`api/search: CANCELLING QUERY '${query}'`)
    clearTimeout(tid)
  }

  return promise
}
