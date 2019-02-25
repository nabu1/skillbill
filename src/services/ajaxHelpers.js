import { LITERALS } from './constants'

export default (context, selectedSkills) => {
  console.log('%c ajaxHelpers selectedSkills = ' + selectedSkills, 'color: white')

  // const query = 's={id:1}'

  const query= `q={"skill_1":"C",$and:[{"rank_1":{$gte:5}}]}`

  const urlString = LITERALS.PREFIX + query + LITERALS.SUFFIX
  console.log('%c urlString =  ' + urlString, 'color: lime')

  return urlString
}
