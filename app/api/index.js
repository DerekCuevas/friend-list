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

  // setting a more realistic timeout
  setTimeout(() => callback(results), 150);
}
