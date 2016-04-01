import {combineArray} from 'most'
import {ul, li, div, h1, h4, span} from '@motorcycle/dom'

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

function renderNoMatches() {
  return div({style}, [
    h1('No matches could be found, try again!')
  ])
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
  backgroundColor: 'rgba(21, 21, 21, 0.9)',
  color: 'white',
  margin: '0',
  transition: 'all 0.2s ease-in-out',
})

function renderLoading() {
  return div({style: loadingStyle}, [
    div('.loader')
  ])
}

function view(friends, isLoading) {
  return div({style: {marginTop: '2em'}}, [
    isLoading ? renderLoading() : null,
    friends.length > 0 ?
      renderFriendList(friends, isLoading) :
      renderNoMatches()
  ])
}

export default friend$ => {
  const friendList$ = friend$.filter(Array.isArray).multicast()
  const isLoading$ = friend$.filter(friends => friends === 'loading')
    .map(() => true)
    .merge(friendList$.map(() => false))
    .startWith(false)

  return combineArray(view, [friendList$, isLoading$])
}
