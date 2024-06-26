import { DynamoDBToolboxError } from '~/errors/dynamoDBToolboxError.js'
import { isInteger } from '~/utils/validation/isInteger.js'

export const parseMaxPagesOption = (maxPages: number): number => {
  if (maxPages === Infinity) {
    return maxPages
  }

  if (!isInteger(maxPages) || maxPages <= 0) {
    throw new DynamoDBToolboxError('options.invalidMaxPagesOption', {
      message: `Invalid limit option: '${String(
        maxPages
      )}'. 'limit' must be Infinity or an integer > 0.`,
      payload: { maxPages }
    })
  }

  return maxPages
}
