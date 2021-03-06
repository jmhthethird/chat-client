import React from 'react'
import MessageActions from './_MessageActions'
import moment from 'moment'
import Markdown from '../../components/Markdown'
import Tooltip from '../../components/Tooltip'
import { Avatar, Icon } from 'antd'

const Message = ({ currentUser, editing, message, onDelete, renderHeading, room }) => {
  const { body, timestamp, user } = message

  return (
    <div className='message'>
      <div className='message-gutter'>
        { renderHeading &&
          <Avatar shape='square' icon='bulb' style={{ backgroundColor: '#52b3f9' }} />
        }
        { !renderHeading &&
          <div>
            <div className='hover-timestamp'>
              <Tooltip placement='top' title={moment(timestamp).calendar()}>
                { moment(timestamp).format('h:mm') }
              </Tooltip>
            </div>
            { editing && <Icon type='edit' /> }
          </div>
        }
      </div>
      <div className='message-content'>
        { renderHeading &&
          <div className='message-heading'>
            <strong>{user}</strong>
            {' '}
            <Tooltip placement='top' title={moment(timestamp).calendar()}>
              { moment(timestamp).format('h:mm A') }
            </Tooltip>
            { editing && <Icon type='edit' /> }
          </div>
        }
        <Markdown value={body} />
        <MessageActions
          currentUser={currentUser}
          message={message}
          room={room}
        />
      </div>
    </div>
  )
}

Message.displayName = 'RoomMessage'

export default Message
