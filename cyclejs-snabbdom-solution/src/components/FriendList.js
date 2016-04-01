import {Observable} from 'rx'
import {ul, li, div, h1, h4, span} from 'cycle-snabbdom'

const style = {
  zIndex: '0',
  opacity: 0,
  margin: '2em',
  transition: 'all 0.3s ease-in-out',
  delayed: {
    opacity: 1,
  },
  remove: {
    opacity: 0,
  }
}

function Friend({name, username}) {
  return div('.friend-thumbnail', [
    h4([name, span('.username', [username])]),
  ])
}

const ulStyle = (isLoading) => ({
  margin: '2em',
  opacity: isLoading ? '0.2' : '1',
  transition: 'all 0.3s ease-in-out',
})

const liStyle = (i) => ({
  zIndex: '-1',
  margin: '0 auto',
  textAlign: 'center',
  transition: 'all 0.6s ease-in-out',
  transform: `translateY(0px) rotateX(-90deg)`,
  height: '30px',
  opacity: 0,
  delayed: {
    opacity: 1,
    transform: `translateY(${i * 15}px) rotateX(0deg)`
  }
})

function renderFriendList(friends, isLoading) {
  return ul('.friend-list', {static: true, style: ulStyle(isLoading)},
    friends.map(
      (friend, i) =>
        li({key: friend.id, style: liStyle(i)}, [ Friend(friend) ])
    )
  )
}

function renderNoMatches(friends) {
  return friends.length > 0 ?
    null: h1('No matches could be found, try again!')
}

const loadingStyle = Object.assign(style, {
  position: 'fixed',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(21, 21, 21, 0.8)',
  color: 'white',
  margin: '0',
  transition: 'all 0.2s ease-in-out',
})

function renderLoading(isLoading) {
  return isLoading ?
    div({style: loadingStyle}, [ div('.loader', {}, [])]) :
    null
}

function view(friends, isLoading) {
  return div({style: {marginTop: '2em'}}, [
    renderLoading(isLoading),
    friends.length > 0 ?
      renderFriendList(friends, isLoading) :
      renderNoMatches(friends)
  ])
}

export default friend$ => {
  const friendList$ = friend$.filter(Array.isArray).share()
  const loading$ = friend$.filter(friends => friends === 'loading').map(true)
  const isLoading$ = loading$.merge(friendList$.map(false))
    .startWith(false)
    .share()
    .debounce(20)

  return friendList$.combineLatest(isLoading$, view)
}
