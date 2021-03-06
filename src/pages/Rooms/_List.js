import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { map } from 'lodash'
import moment from 'moment'
import { joinRooms } from '../../actions/rooms'
import { getRooms } from '../../reducers/rooms'
import { getRoomsJoined } from '../../reducers/roomsJoined'
import { meta } from '../../helpers/presence'
import CreateRoomForm from './_Form'
import { Icon } from 'antd'

export class RoomsList extends Component {
  componentDidMount () {
    this.props.onJoin()
  }

  render () {
    const { rooms, roomsJoined } = this.props

    const renderRoom = (room, name) => {
      const lastMessage = meta(room, 'last_message')
      const timestamp = lastMessage ? moment(lastMessage.timestamp).calendar() : null

      return (
        <li key={name}>
          <Link to={'/rooms/' + name}>
            <strong>{name}</strong>
          </Link>
          {' '}
          {timestamp &&
            <span>
              <Icon type='clock-circle-o' />
              {' '}
              {timestamp}
            </span>
          }
        </li>
      )
    }

    return (
      <div>
        <h3>Rooms</h3>
        <ul>
          { map(rooms, renderRoom) }
        </ul>
        <CreateRoomForm />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  rooms: getRooms(state),
  roomsJoined: getRoomsJoined(state)
})

const mapDispatchToProps = (dispatch) => ({
  onJoin: () => dispatch(joinRooms())
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList)
