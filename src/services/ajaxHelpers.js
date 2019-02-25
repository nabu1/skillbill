import { LITERALS } from './constants'

export default (context, selectedSkills) => {
  console.log('%c ajaxHelpers selectedSkills = ' + JSON.stringify(selectedSkills), 'color: white')

  const skill_1 = selectedSkills.skill_1
  const rank_1 = selectedSkills.rank_1
  const skill_2 = selectedSkills.skill_2
  const rank_2 = selectedSkills.rank_2
  const skill_3 = selectedSkills.skill_3
  const rank_3 = selectedSkills.rank_3

  console.log('%c skill_1 = ' + skill_1, 'color: white')
  console.log('%c rank_1 = ' + rank_1, 'color: white')

  console.log('%c skill_2 = ' + skill_2, 'color: white')
  console.log('%c rank_2 = ' + rank_2, 'color: white')

  console.log('%c skill_3 = ' + skill_3, 'color: white')
  console.log('%c rank_3 = ' + rank_3, 'color: white')

  // const query = 's={id:1}'

  // const query = `q={"skill_1":"C",$and:[{"rank_1":{$gte:5}}]}`

  // let query = `q={"skill_1":"C",$and:[{"rank_1":{$gte:0}},{$and:[{"skill_2":"Java"},{$and:[{"rank_2":{$gte:3}},{$and:[{"skill_3":"JS"},{$and:[{"rank_3":{$gte:0}}]}]}]}]}]}`

  /// let query = 'q={"skill_1":"JS",$and:[{"rank_1":{$gte:1}},{$and:[{"skill_2":"Java"},{$and:[{"rank_2":{$gte:1}},{$and:[{"skill_3":"ObjC"},{$and:[{"rank_3":{$gte:1}}]}]}]}]}]}'

  ///let query = 'q={"skill_1":' + `"JS"` + ',$and:[{"rank_1":{$gte:' + 1 + '}},{$and:[{"skill_2":"' + "Java" +'"},{$and:[{"rank_2":{$gte:1}},{$and:[{"skill_3":"ObjC"},{$and:[{"rank_3":{$gte:1}}]}]}]}]}]}'

  ///let query = 'q={"skill_1":' + `"JS"` + ',$and:[{"rank_1":{$gte:' + 1 + '}},{$and:[{"skill_2":"' + "Java" + '"},{$and:[{"rank_2":{$gte:' + 1 + '}},{$and:[{"skill_3":"ObjC"},{$and:[{"rank_3":{$gte:1}}]}]}]}]}]}'

  /// let query = 'q={"skill_1":"' + "JS" + '",$and:[{"rank_1":{$gte:' + 1 + '}},{$and:[{"skill_2":"' + "Java" + '"},{$and:[{"rank_2":{$gte:' + 1 + '}},{$and:[{"skill_3":"' + "ObjC" + '"},{$and:[{"rank_3":{$gte:' + 1 + '}}]}]}]}]}]}'

  /// let query = 'q={"skill_1":"' + "JS" + '",$and:[{"rank_1":{$gte:' + 1 + '}},{$and:[{"skill_2":"' + "Java" + '"},{$and:[{"rank_2":{$gte:' + 1 + '}},{$and:[{"skill_3":"' + "ObjC" + '"},{$and:[{"rank_3":{$gte:' + 1 + '}}]}]}]}]}]}'

  let query1 = 'q={"skill_1":"' + skill_1 + '",$and:[{"rank_1":{$gte:' + rank_1 + '}},{$and:[{"skill_2":"' + skill_2 + '"},{$and:[{"rank_2":{$gte:' + rank_2 + '}},{$and:[{"skill_3":"' + skill_3 + '"},{$and:[{"rank_3":{$gte:' + rank_3 + '}}]}]}]}]}]}'


  let query2 = 'q={"skill_1":"' + skill_1 + '",$and:[{"rank_1":{$gte:' + rank_1 + '}},{$and:[{"skill_2":"' + skill_2 + '"},{$and:[{"rank_2":{$gte:' + rank_2 + '}}]}]}]}'

  let query3 = 'q={"skill_1":"' + skill_1 + '",$and:[{"rank_1":{$gte:' + rank_1 + '}}]}'




  const urlString = LITERALS.PREFIX + query3 + LITERALS.SUFFIX
  console.log('%c urlString =  ' + urlString, 'color: lime')

  return urlString
}
