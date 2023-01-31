import type { O } from 'ts-toolbelt'

import type {
  Item,
  _Item,
  Attribute,
  _Attribute,
  ResolvedAttribute,
  AnyAttribute,
  _AnyAttribute,
  ConstantAttribute,
  _ConstantAttribute,
  PrimitiveAttribute,
  _PrimitiveAttribute,
  SetAttribute,
  _SetAttribute,
  ListAttribute,
  _ListAttribute,
  MapAttribute,
  _MapAttribute,
  Always,
  ResolvePrimitiveAttributeType
} from 'v1/item'
import type {
  $type,
  $elements,
  $attributes,
  $value,
  $required,
  $key,
  $open,
  $default,
  $enum
} from 'v1/item/attributes/constants/attributeOptions'

import { EntityV2 } from '../class'

/**
 * Key input of a single item command (GET, DELETE ...) for an Entity, Item or Attribute
 *
 * @param Schema Entity | Item | Attribute
 * @return Object
 */
export type KeyInput<SCHEMA extends EntityV2 | Item | Attribute> = SCHEMA extends AnyAttribute
  ? ResolvedAttribute
  : SCHEMA extends ConstantAttribute
  ? SCHEMA['value']
  : SCHEMA extends PrimitiveAttribute
  ? // TODO: FIX THIS ISSUE
    // ? SCHEMA['enum'] extends ResolvePrimitiveAttributeType<SCHEMA['type']>[]
    //   ? SCHEMA['enum'][number]
    //   : ResolvePrimitiveAttributeType<SCHEMA['type']>
    ResolvePrimitiveAttributeType<SCHEMA['type']>
  : SCHEMA extends SetAttribute
  ? Set<KeyInput<SCHEMA['elements']>>
  : SCHEMA extends ListAttribute
  ? KeyInput<SCHEMA['elements']>[]
  : SCHEMA extends MapAttribute | Item
  ? O.Required<
      O.Partial<
        {
          // Keep only key attributes
          [key in O.SelectKeys<SCHEMA['attributes'], { key: true }>]: KeyInput<
            SCHEMA['attributes'][key]
          >
        }
      >,
      Exclude<
        // Enforce Always Required attributes
        O.SelectKeys<SCHEMA['attributes'], { required: Always }>,
        // ...Except those that have default (not required from user, can be provided by the lib)
        O.FilterKeys<SCHEMA['attributes'], { default: undefined }>
      >
    > & // Add Record<string, ResolvedAttribute> if map is open
      (SCHEMA extends { open: true } ? Record<string, ResolvedAttribute> : unknown)
  : SCHEMA extends EntityV2
  ? KeyInput<SCHEMA['item']>
  : never

// TODO: Required in Entity constructor... See if possible to use only KeyInput w. Item
export type _KeyInput<SCHEMA extends EntityV2 | _Item | _Attribute> = SCHEMA extends _AnyAttribute
  ? ResolvedAttribute
  : SCHEMA extends _ConstantAttribute
  ? SCHEMA[$value]
  : SCHEMA extends _PrimitiveAttribute
  ? // TODO: FIX THIS ISSUE
    // ? SCHEMA[$enum] extends ResolvePrimitiveAttributeType<SCHEMA[$type]>[]
    //   ? SCHEMA[$enum][number]
    //   : ResolvePrimitiveAttributeType<SCHEMA[$type]>
    ResolvePrimitiveAttributeType<SCHEMA[$type]>
  : SCHEMA extends _SetAttribute
  ? Set<_KeyInput<SCHEMA[$elements]>>
  : SCHEMA extends _ListAttribute
  ? _KeyInput<SCHEMA[$elements]>[]
  : SCHEMA extends _MapAttribute | _Item
  ? O.Required<
      O.Partial<
        {
          // Keep only key attributes
          [key in O.SelectKeys<SCHEMA[$attributes], { [$key]: true }>]: _KeyInput<
            SCHEMA[$attributes][key]
          >
        }
      >,
      Exclude<
        // Enforce Always Required attributes
        O.SelectKeys<SCHEMA[$attributes], { [$required]: Always }>,
        // ...Except those that have default (not required from user, can be provided by the lib)
        O.FilterKeys<SCHEMA[$attributes], { [$default]: undefined }>
      >
    > & // Add Record<string, ResolvedAttribute> if map is open
      (SCHEMA extends { [$open]: true } ? Record<string, ResolvedAttribute> : unknown)
  : SCHEMA extends EntityV2
  ? _KeyInput<SCHEMA['_item']>
  : never
