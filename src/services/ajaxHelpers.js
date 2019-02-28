import { LITERALS } from './constants'

export const fetch = (context, selectedSkills = {}) => {
  console.log('%c ajaxHelpers selectedSkills = ' + JSON.stringify(selectedSkills), 'color: lime')

  if (selectedSkills.paginationLimit) {
    console.log('%c selectedSkills.paginationLimit = ' + selectedSkills.paginationLimit, 'color: lime')

    if (selectedSkills.paginationLimit > 1000) {
      const limit = Number(String(selectedSkills.paginationLimit).slice(1)) || 1000
      const skip = Number(selectedSkills.paginationLimit) - limit
      console.log('%c skip = ' + skip, 'color: violet')
      console.log('%c limit = ' + limit, 'color: violet')
      return LITERALS.PREFIX + `?s={id:1}&sk=${skip}&l=${limit}` + LITERALS.SUFFIX
    }

    return LITERALS.PREFIX + '?s={id:1}&l=1000' + LITERALS.SUFFIX
  }

  let query = ''
  const skill_1 = selectedSkills.skill_1
  const rank_1 = selectedSkills.rank_1 || 1
  const skill_2 = selectedSkills.skill_2
  const rank_2 = selectedSkills.rank_2 || 1
  const skill_3 = selectedSkills.skill_3
  const rank_3 = selectedSkills.rank_3 || 1

  /*
  console.log('%c title = ' + title, 'color: white')

  console.log('%c skill_1 = ' + skill_1, 'color: white')
  console.log('%c rank_1 = ' + rank_1, 'color: white')

  console.log('%c skill_2 = ' + skill_2, 'color: white')
  console.log('%c rank_2 = ' + rank_2, 'color: white')

  console.log('%c skill_3 = ' + skill_3, 'color: white')
  console.log('%c rank_3 = ' + rank_3, 'color: white')
 */

  if (skill_1 && rank_1 && skill_2 && rank_2 && skill_3 && rank_3) {
    // console.log('3 skille')
    query = '?s={id:1}&q={"skill_1":"' + skill_1 + '",$and:[{"rank_1":{$gte:' + rank_1 + '}},{$and:[{"skill_2":"' + skill_2 + '"},{$and:[{"rank_2":{$gte:' + rank_2 + '}},{$and:[{"skill_3":"' + skill_3 + '"},{$and:[{"rank_3":{$gte:' + rank_3 + '}}]}]}]}]}]}'
  }
  else if (skill_1 && rank_1 && skill_2 && rank_2) {
    // console.log('2 skille')
    query = '?s={id:1}&q={"skill_1":"' + skill_1 + '",$and:[{"rank_1":{$gte:' + rank_1 + '}},{$and:[{"skill_2":"' + skill_2 + '"},{$and:[{"rank_2":{$gte:' + rank_2 + '}}]}]}]}'
  }
  else if (skill_1 && rank_1) {
    // console.log('1 skill')
    query = '?s={id:1}&q={"skill_1":"' + skill_1 + '",$and:[{"rank_1":{$gte:' + rank_1 + '}}]}'
  }
  else {
    // query = '?s={id:1}&l=1000'  // limit 9 rekordów zamiast 1,000 przy pustych selektach
    query = '?s={id:1}'  // mLab ma limit  1,000 dokumentów
  }


  const urlString = LITERALS.PREFIX + query + LITERALS.SUFFIX
  console.log('%c urlString = ' + urlString, 'color: lime')

  return urlString
}

