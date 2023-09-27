import type { Schema, Item, Extension } from 'v1/schema'
import type { If } from 'v1/types'
import { isObject } from 'v1/utils/validation/isObject'
import { DynamoDBToolboxError } from 'v1/errors'
import { $savedAs } from 'v1/schema/attributes/constants/attributeOptions'

import type { HasExtension, ParsedItem } from '../types'
import type { ParsingOptions } from './types'
import { parseAttributeClonedInput } from './attribute'
import { doesAttributeMatchFilters } from './doesAttributeMatchFilter'

export const parseSchemaClonedInput = <EXTENSION extends Extension = never>(
  schema: Schema,
  input: Item<EXTENSION>,
  ...[parsingOptions = {} as ParsingOptions<EXTENSION>]: If<
    HasExtension<EXTENSION>,
    [options: ParsingOptions<EXTENSION>],
    [options?: ParsingOptions<EXTENSION>]
  >
): ParsedItem<EXTENSION> => {
  const { filters } = parsingOptions

  if (!isObject(input)) {
    throw new DynamoDBToolboxError('parsing.invalidItem', {
      message: 'Put command items should be objects',
      payload: {
        received: input,
        expected: 'object'
      }
    })
  }

  const parsedInput: ParsedItem<EXTENSION> = { [$savedAs]: {} }

  // Check that entries match filtered schema
  Object.entries(input).forEach(([attributeName, attributeInput]) => {
    const attribute = schema.attributes[attributeName]

    if (attribute === undefined) return

    if (doesAttributeMatchFilters(attribute, filters)) {
      const parsedAttributeInput = parseAttributeClonedInput(
        attribute,
        attributeInput,
        parsingOptions
      )

      if (parsedAttributeInput !== undefined) {
        parsedInput[attributeName] = parsedAttributeInput

        if (attribute.savedAs !== undefined) {
          parsedInput[$savedAs][attributeName] = attribute.savedAs
        }
      }
    }
  })

  // Check that rest of filtered schema attributes are matched by input
  Object.entries(schema.attributes)
    .filter(
      ([attributeName, attribute]) =>
        parsedInput[attributeName] === undefined && doesAttributeMatchFilters(attribute, filters)
    )
    .forEach(([attributeName, attribute]) => {
      const parsedAttributeInput = parseAttributeClonedInput(attribute, undefined, parsingOptions)

      if (parsedAttributeInput !== undefined) {
        parsedInput[attributeName] = parsedAttributeInput

        if (attribute.savedAs !== undefined) {
          parsedInput[$savedAs][attributeName] = attribute.savedAs
        }
      }
    })

  return parsedInput
}