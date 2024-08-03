import { DynamoDBToolboxError } from '~/errors/index.js'
import { isStaticDefault } from '~/schema/utils/isStaticDefault.js'
import type { Update } from '~/types/update.js'
import { validatorsByPrimitiveType } from '~/utils/validation/validatorsByPrimitiveType.js'

import type { $state, $type } from '../constants/attributeOptions.js'
import { validateAttributeProperties } from '../shared/validate.js'
import { PrimitiveAttribute } from './interface.js'
import type { $PrimitiveAttributeState } from './interface.js'
import type { PrimitiveAttributeState, PrimitiveAttributeType } from './types.js'

export type FreezePrimitiveAttribute<$PRIMITIVE_ATTRIBUTE extends $PrimitiveAttributeState> =
  // Applying void Update improves type display
  Update<
    PrimitiveAttribute<$PRIMITIVE_ATTRIBUTE[$type], $PRIMITIVE_ATTRIBUTE[$state]>,
    never,
    never
  >

type PrimitiveAttributeFreezer = <
  TYPE extends PrimitiveAttributeType,
  STATE extends PrimitiveAttributeState<TYPE>
>(
  type: TYPE,
  primitiveAttribute: STATE,
  path?: string
) => FreezePrimitiveAttribute<$PrimitiveAttributeState<TYPE, STATE>>

/**
 * Freezes a warm `boolean`, `number`,  `string` or `binary` attribute
 * @param type Attribute type
 * @param state Attribute options
 * @param path Path of the instance in the related schema (string)
 * @returns void
 */
export const freezePrimitiveAttribute: PrimitiveAttributeFreezer = <
  TYPE extends PrimitiveAttributeType,
  STATE extends PrimitiveAttributeState<TYPE>
>(
  type: TYPE,
  state: STATE,
  path?: string
): FreezePrimitiveAttribute<$PrimitiveAttributeState<TYPE, STATE>> => {
  validateAttributeProperties(state, path)

  const typeValidator = validatorsByPrimitiveType[type]

  const { enum: enumValues } = state
  enumValues?.forEach(enumValue => {
    const isEnumValueValid = typeValidator(enumValue)
    if (!isEnumValueValid) {
      throw new DynamoDBToolboxError('schema.primitiveAttribute.invalidEnumValueType', {
        message: `Invalid enum value type${
          path !== undefined ? ` at path '${path}'` : ''
        }. Expected: ${type}. Received: ${String(enumValue)}.`,
        path,
        payload: { expectedType: type, enumValue }
      })
    }
  })

  for (const defaultValue of Object.values(state.defaults)) {
    if (defaultValue !== undefined && isStaticDefault(defaultValue)) {
      if (!typeValidator(defaultValue)) {
        throw new DynamoDBToolboxError('schema.primitiveAttribute.invalidDefaultValueType', {
          message: `Invalid default value type${
            path !== undefined ? ` at path '${path}'` : ''
          }: Expected: ${type}. Received: ${String(defaultValue)}.`,
          path,
          payload: { expectedType: type, defaultValue }
        })
      }

      if (enumValues !== undefined && !enumValues.some(enumValue => enumValue === defaultValue)) {
        throw new DynamoDBToolboxError('schema.primitiveAttribute.invalidDefaultValueRange', {
          message: `Invalid default value${
            path !== undefined ? ` at path '${path}'` : ''
          }: Expected one of: ${enumValues.join(', ')}. Received: ${String(defaultValue)}.`,
          path,
          payload: { enumValues, defaultValue }
        })
      }
    }
  }

  return new PrimitiveAttribute({ path, type, ...state })
}
