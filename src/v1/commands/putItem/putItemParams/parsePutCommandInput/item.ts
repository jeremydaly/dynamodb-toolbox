import { Item, PossiblyUndefinedResolvedItem, PutItem } from 'v1'
import { isObject } from 'v1/utils/validation'
import { isClosed } from 'v1/item/utils'

import { parseAttributePutCommandInput } from './attribute'

export const parseItemPutCommandInput = <ITEM extends Item>(
  item: Item,
  input: PossiblyUndefinedResolvedItem
): PutItem<ITEM> => {
  if (!isObject(input)) {
    // TODO
    throw new Error()
  }

  const parsedPutItemInput: PossiblyUndefinedResolvedItem = {}

  // Check that putItemInput entries match schema
  Object.entries(input).forEach(([attributeName, attributeInput]) => {
    const attribute = item.attributes[attributeName]

    if (attribute !== undefined) {
      const parsedAttributePutCommandInput = parseAttributePutCommandInput(
        attribute,
        attributeInput
      )

      if (parsedAttributePutCommandInput !== undefined) {
        parsedPutItemInput[attributeName] = parsedAttributePutCommandInput
      }
    } else {
      if (isClosed(item)) {
        // TODO Add strict mode, and throw if strict mode is on
        return
      } else {
        parsedPutItemInput[attributeName] = attributeInput
      }
    }
  })

  // Check that schema attributes entries are matched by putItemInput
  Object.entries(item.attributes).forEach(([attributeName, attribute]) => {
    if (parsedPutItemInput[attributeName] === undefined) {
      const parsedAttributePutCommandInput = parseAttributePutCommandInput(attribute, undefined)

      if (parsedAttributePutCommandInput !== undefined) {
        parsedPutItemInput[attributeName] = parsedAttributePutCommandInput
      }
    }
  })

  return parsedPutItemInput as PutItem<ITEM>
}
