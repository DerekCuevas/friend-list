import {create} from 'most'
import friends from './friends'

// mock api search
export default function search(query = ``) {
  const results = friends.filter(friend => {
    const keys = Object.keys(friend)
    // faster search
    for (let i = 0; i < keys.length; ++i) {
      const val = friend[keys[i]].toString().toLowerCase()
      if (val.includes(query.toLowerCase())) {
        return true
      }
    }
    return false
  })

  // use an stream for our search API so that it's actually cancellable when we dispose of our subscription
  return create((next) => {
    const timeout = setTimeout(() => {
      console.log(`RESOLVING search ${timeout}`)
      next(results)
    }, Math.ceil(100 + Math.random() * 500)) // make delay longer to make cancellation and loading screen obvious

    next('loading') // send 'loading' state
    console.log(`STARTING search ${timeout}`)

    return () => {
      console.log(`DISPOSING search ${timeout}`)
      clearTimeout(timeout)
    }
  }).startWith(friends)
}
