import type { ErrorBlueprint } from '~/errors/blueprint.js'

import type {
  PrimitiveAttributeEnumValues,
  PrimitiveAttributeType,
  ResolvePrimitiveAttributeType
} from './types.js'

type InvalidEnumValueTypeErrorBlueprint = ErrorBlueprint<{
  code: 'schema.primitiveAttribute.invalidEnumValueType'
  hasPath: true
  payload: {
    expectedType: PrimitiveAttributeType
    enumValue: ResolvePrimitiveAttributeType<PrimitiveAttributeType>
  }
}>

type InvalidDefaultValueTypeErrorBlueprint = ErrorBlueprint<{
  code: 'schema.primitiveAttribute.invalidDefaultValueType'
  hasPath: true
  payload: {
    expectedType: PrimitiveAttributeType
    defaultValue: unknown
  }
}>

type InvalidDefaultValueRangeErrorBlueprint = ErrorBlueprint<{
  code: 'schema.primitiveAttribute.invalidDefaultValueRange'
  hasPath: true
  payload: {
    enumValues: NonNullable<PrimitiveAttributeEnumValues<PrimitiveAttributeType>>
    defaultValue: unknown
  }
}>

export type PrimitiveAttributeErrorBlueprints =
  | InvalidEnumValueTypeErrorBlueprint
  | InvalidDefaultValueTypeErrorBlueprint
  | InvalidDefaultValueRangeErrorBlueprint
