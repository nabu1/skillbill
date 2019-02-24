import { LITERALS } from './constants'

export default context => {

  const query = 's={id:1}'
  const urlString = LITERALS.PREFIX + query + LITERALS.SUFFIX
  console.log('%c urlString =  ' + urlString, 'color: lime')

  return urlString
}
