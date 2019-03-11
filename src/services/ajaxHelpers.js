import { LITERALS, NUMBERS } from './constants'

export const fetch = (context, selectedSkills = {}) => {
  if (selectedSkills.paginationLimit) {
    if (selectedSkills.paginationLimit > NUMBERS.PAGINATION_LIMIT) {
      const limit = Number(String(selectedSkills.paginationLimit).slice(1)) || NUMBERS.PAGINATION_LIMIT
      const skip = Number(selectedSkills.paginationLimit) - limit
      return LITERALS.PREFIX + `?s={id:1}&sk=${skip}&l=${limit}` + LITERALS.SUFFIX
    }
    return LITERALS.PREFIX + '?s={id:1}&l=' + NUMBERS.DOWNLOAD_LIMIT + LITERALS.SUFFIX
  }

  let query = ''
  const skill1 = selectedSkills.skill1
  const rank1 = selectedSkills.rank1 || 1
  const skill2 = selectedSkills.skill2
  const rank2 = selectedSkills.rank2 || 1
  const skill3 = selectedSkills.skill3
  const rank3 = selectedSkills.rank3 || 1

  if (skill1 && rank1 && skill2 && rank2 && skill3 && rank3) {
    query = '?s={id:1}&q={"skill1":"' + skill1 + '",$and:[{"rank1":{$gte:' + rank1 + '}}, \
      {$and:[{"skill2":"' + skill2 + '"},{$and:[{"rank2":{$gte:' + rank2 + '}}, \
      {$and:[{"skill3":"' + skill3 + '"},{$and:[{"rank3":{$gte:' + rank3 + '}}]}]}]}]}]}'
  }
  else if (skill1 && rank1 && skill2 && rank2) {
    query = '?s={id:1}&q={"skill1":"' + skill1 + '",$and:[{"rank1":{$gte:' + rank1 + '}}, \
      {$and:[{"skill2":"' + skill2 + '"},{$and:[{"rank2":{$gte:' + rank2 + '}}]}]}]}'
  }
  else if (skill1 && rank1) {
    query = '?s={rank1:-1}&q={"skill1":"' + skill1 + '",$and:[{"rank1":{$gte:' + rank1 + '}}]}'
  }
  else {
    query = '?s={id:1}&l=' + NUMBERS.DOWNLOAD_LIMIT
  }

  const urlString = LITERALS.PREFIX + query + LITERALS.SUFFIX

  return urlString
}

export const findText = text => {
  const query = `?q={$or:[{"first":{"$regex":".*${text}.*",$options:"i"}},{"last":{"$regex":".*${text}.*",$options:"i"}}]}`
  const urlString = LITERALS.PREFIX + query + LITERALS.SUFFIX

  return urlString
}
