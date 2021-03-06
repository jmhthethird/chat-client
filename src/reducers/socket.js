const initialState = {
  connected: false,
  connection: null,
  url: 'ws://chat-server.dev/socket'
}

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SOCKET_NEW':
      return {...state, connection: action.connection}
    case 'SOCKET_OPEN':
      return {...state, connected: true}
    case 'SOCKET_CLOSE':
      return initialState
    default:
      return state
  }
}

export const getSocket = (state) => state.socket
export const getSocketConnection = (state) => state.socket.connection
export const isConnected = (state) => state.socket.connected
export const withSocketConnection = (getState, callback, attempt = 0) => {
  const interval = 25
  const max = Math.ceil(5000 / interval)

  setTimeout(() => {
    if (attempt >= max) {
      throw new Error('Could not retrieve socket connection')
    }

    const state = getState()
    const socket = state.socket.connection

    if (socket) {
      callback(socket)
    } else {
      withSocketConnection(getState, callback, attempt + 1)
    }
  }, interval)
}

export default socketReducer
