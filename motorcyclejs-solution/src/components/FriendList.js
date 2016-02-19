import {ul, li, div, h4, span} from '@motorcycle/dom'

function Friend({name, username}) {
  return div('.friend-thumbnail', [
    h4([name, span('.username', [username])]),
  ])
}

function FriendList(friend$) {
  return friend$.map(friends =>
    ul('.friend-list', {static: true},
      friends.map(friend => li({key: friend.id}, [Friend(friend)]))
    )
  )
}

export default FriendList
