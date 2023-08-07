import type { O } from 'ts-toolbelt'

import type {
  Schema,
  Attribute,
  AttributeValue,
  ResolvePrimitiveAttribute,
  Item,
  AnyAttribute,
  PrimitiveAttribute,
  SetAttribute,
  ListAttribute,
  MapAttribute,
  RecordAttribute,
  AnyOfAttribute,
  AtLeastOnce,
  Always,
  Never,
  ComputedDefault
} from 'v1/schema'
import type { OptionalizeUndefinableProperties } from 'v1/types/optionalizeUndefinableProperties'
import type { EntityV2 } from 'v1/entity/class'
import type { If } from 'v1/types/if'
import type { AttributePutItemInput } from 'v1/commands/putItem/types'
import type { SchemaAttributePath } from 'v1/commands/types'

import { $HAS_VERB, $SET, $GET, $ADD, $DELETE, $REMOVE, $APPEND, $PREPEND } from './constants'

// Distinguishing verbal syntax from non-verbal is necessary for type inference & better parsing
export type Verbal<VALUE> = { [$HAS_VERB]: true } & VALUE

export type ADD<VALUE> = Verbal<{ [$ADD]: VALUE }>
export type SET<VALUE> = Verbal<{ [$SET]: VALUE }>
export type GET<VALUE> = Verbal<{ [$GET]: VALUE }>
export type DELETE<VALUE> = Verbal<{ [$DELETE]: VALUE }>
export type APPEND<VALUE> = Verbal<{ [$APPEND]: VALUE }>
export type PREPEND<VALUE> = Verbal<{ [$PREPEND]: VALUE }>

export type NonVerbal<VALUE> = { [$HAS_VERB]?: false } & VALUE

export type UpdateItemInputExtension =
  | { type: '*'; value: $REMOVE }
  | { type: '*'; value: Verbal<{ [$GET]: string }> }
  | {
      type: 'number'
      value: Verbal<{ [$ADD]: number }>
    }
  | {
      type: 'set'
      value: Verbal<
        | { [$ADD]: AttributeValue<UpdateItemInputExtension> }
        | { [$DELETE]: AttributeValue<UpdateItemInputExtension> }
      >
    }
  | {
      type: 'list'
      value:
        | NonVerbal<{ [INDEX in number]: AttributeValue<UpdateItemInputExtension> }>
        | Verbal<{ [$SET]: AttributeValue<UpdateItemInputExtension>[] }>
        | Verbal<
            | { [$APPEND]: AttributeValue<UpdateItemInputExtension>[] }
            | { [$PREPEND]: AttributeValue<UpdateItemInputExtension>[] }
            // TODO: CONCAT to join two unrelated lists
          >
    }
  | {
      type: 'map'
      value: Verbal<{ [$SET]: AttributeValue<UpdateItemInputExtension> }>
    }
  | {
      type: 'record'
      value: Verbal<{ [$SET]: AttributeValue<UpdateItemInputExtension> }>
    }

type MustBeDefined<
  ATTRIBUTE extends Attribute,
  REQUIRE_INDEPENDENT_DEFAULTS extends boolean = false
> =
  // Enforce Required attributes that don't have default values
  ATTRIBUTE extends { required: Always } & (
    | { key: true; defaults: { key: undefined } }
    | { key: false; defaults: { update: undefined } }
  )
    ? true
    : REQUIRE_INDEPENDENT_DEFAULTS extends true
    ? // Add attributes with independent defaults if REQUIRE_INDEPENDENT_DEFAULTS is true
      ATTRIBUTE extends
        | { key: true; defaults: { key: undefined | ComputedDefault } }
        | { key: false; defaults: { update: undefined | ComputedDefault } }
      ? false
      : true
    : false

type CanBeRemoved<ATTRIBUTE extends Attribute> = ATTRIBUTE extends { required: 'never' }
  ? true
  : false

/**
 * User input of an UPDATE command for a given Entity or Schema
 *
 * @param Schema Entity | Schema
 * @param RequireIndependentDefaults Boolean
 * @return Object
 */
export type UpdateItemInput<
  SCHEMA extends EntityV2 | Schema,
  REQUIRE_INDEPENDENT_DEFAULTS extends boolean = false
> = EntityV2 extends SCHEMA
  ? Item<UpdateItemInputExtension>
  : Schema extends SCHEMA
  ? Item<UpdateItemInputExtension>
  : SCHEMA extends Schema
  ? OptionalizeUndefinableProperties<
      {
        [KEY in keyof SCHEMA['attributes']]: AttributeUpdateItemInput<
          SCHEMA['attributes'][KEY],
          REQUIRE_INDEPENDENT_DEFAULTS,
          SchemaAttributePath<SCHEMA>
        >
      },
      // Sadly we override optional AnyAttributes as 'unknown | undefined' => 'unknown' (undefined lost in the process)
      O.SelectKeys<SCHEMA['attributes'], AnyAttribute & { required: AtLeastOnce | Never }>
    >
  : SCHEMA extends EntityV2
  ? UpdateItemInput<SCHEMA['schema'], REQUIRE_INDEPENDENT_DEFAULTS>
  : never

/**
 * User input of an UPDATE command for a given Attribute
 *
 * @param Attribute Attribute
 * @param RequireIndependentDefaults Boolean
 * @return Any
 */
export type AttributeUpdateItemInput<
  ATTRIBUTE extends Attribute,
  REQUIRE_INDEPENDENT_DEFAULTS extends boolean = false,
  ATTRIBUTE_PATH extends string = string
> = Attribute extends ATTRIBUTE
  ? AttributeValue<UpdateItemInputExtension> | undefined
  :
      | If<MustBeDefined<ATTRIBUTE, REQUIRE_INDEPENDENT_DEFAULTS>, never, undefined>
      | If<CanBeRemoved<ATTRIBUTE>, $REMOVE, never>
      | GET<ATTRIBUTE_PATH>
      | (ATTRIBUTE extends AnyAttribute
          ? unknown
          : ATTRIBUTE extends PrimitiveAttribute
          ?
              | ResolvePrimitiveAttribute<ATTRIBUTE>
              | (ATTRIBUTE extends PrimitiveAttribute<'number'>
                  ? ADD<ResolvePrimitiveAttribute<ATTRIBUTE>>
                  : never)
          : ATTRIBUTE extends SetAttribute
          ?
              | Set<AttributePutItemInput<ATTRIBUTE['elements'], REQUIRE_INDEPENDENT_DEFAULTS>>
              | ADD<Set<AttributePutItemInput<ATTRIBUTE['elements'], REQUIRE_INDEPENDENT_DEFAULTS>>>
              | DELETE<
                  Set<AttributePutItemInput<ATTRIBUTE['elements'], REQUIRE_INDEPENDENT_DEFAULTS>>
                >
          : ATTRIBUTE extends ListAttribute
          ? // TODO: Test
            | NonVerbal<
                  {
                    [INDEX in number]?:
                      | AttributeUpdateItemInput<
                          ATTRIBUTE['elements'],
                          REQUIRE_INDEPENDENT_DEFAULTS,
                          ATTRIBUTE_PATH
                        >
                      | $REMOVE
                  }
                >
              | SET<
                  AttributeUpdateItemInput<
                    ATTRIBUTE['elements'],
                    REQUIRE_INDEPENDENT_DEFAULTS,
                    /**
                     * @debt TODO "Test that references do not work in set lists"
                     */
                    never
                  >[]
                >
              | APPEND<
                  (
                    | GET<ATTRIBUTE_PATH>
                    | AttributePutItemInput<ATTRIBUTE['elements'], REQUIRE_INDEPENDENT_DEFAULTS>
                  )[]
                >
              | PREPEND<
                  (
                    | GET<ATTRIBUTE_PATH>
                    | AttributePutItemInput<ATTRIBUTE['elements'], REQUIRE_INDEPENDENT_DEFAULTS>
                  )[]
                >
          : ATTRIBUTE extends MapAttribute
          ?
              | NonVerbal<
                  OptionalizeUndefinableProperties<
                    {
                      [KEY in keyof ATTRIBUTE['attributes']]: AttributeUpdateItemInput<
                        ATTRIBUTE['attributes'][KEY],
                        REQUIRE_INDEPENDENT_DEFAULTS,
                        ATTRIBUTE_PATH
                      >
                    },
                    // Sadly we override optional AnyAttributes as 'unknown | undefined' => 'unknown' (undefined lost in the process)
                    O.SelectKeys<
                      ATTRIBUTE['attributes'],
                      AnyAttribute & { required: AtLeastOnce | Never }
                    >
                  >
                >
              | SET<AttributePutItemInput<ATTRIBUTE, REQUIRE_INDEPENDENT_DEFAULTS>>
          : ATTRIBUTE extends RecordAttribute
          ?
              | NonVerbal<
                  {
                    [KEY in ResolvePrimitiveAttribute<ATTRIBUTE['keys']>]?:
                      | AttributeUpdateItemInput<
                          ATTRIBUTE['elements'],
                          REQUIRE_INDEPENDENT_DEFAULTS,
                          ATTRIBUTE_PATH
                        >
                      | $REMOVE
                  }
                >
              | SET<AttributePutItemInput<ATTRIBUTE, REQUIRE_INDEPENDENT_DEFAULTS>>
          : ATTRIBUTE extends AnyOfAttribute
          ? AttributeUpdateItemInput<
              ATTRIBUTE['elements'][number],
              REQUIRE_INDEPENDENT_DEFAULTS,
              ATTRIBUTE_PATH
            >
          : never)
