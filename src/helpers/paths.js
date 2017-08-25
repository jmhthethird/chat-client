import join from 'url-join'
import parser from 'url-parse'
import qs from 'qs'
import { trim } from 'lodash'

export const queryString = () => {
  const raw = parser(window.location).query || ''
  const trimmed = trim(raw, '?')

  return qs.parse(trimmed) || {}
}

export const url = (path = '/') => (
  join(parser(window.location).origin, path)
)

export default url
