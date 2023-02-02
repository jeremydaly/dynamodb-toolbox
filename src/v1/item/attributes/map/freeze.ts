import type { RequiredOption } from '../constants/requiredOptions'
import { validateAttributeProperties } from '../shared/validate'
import { freezeAttribute, FreezeAttribute } from '../freeze'
import {
  $type,
  $attributes,
  $required,
  $hidden,
  $key,
  $open,
  $savedAs,
  $default
} from '../constants/attributeOptions'
import type { MapAttributeAttributes } from '../types/attribute'

import type { $MapAttribute, MapAttribute } from './interface'

export type FreezeMapAttribute<$MAP_ATTRIBUTE extends $MapAttribute> = MapAttribute<
  $MapAttribute extends $MAP_ATTRIBUTE
    ? MapAttributeAttributes
    : {
        [KEY in keyof $MAP_ATTRIBUTE[$attributes]]: FreezeAttribute<
          $MAP_ATTRIBUTE[$attributes][KEY]
        >
      },
  {
    required: $MAP_ATTRIBUTE[$required]
    hidden: $MAP_ATTRIBUTE[$hidden]
    key: $MAP_ATTRIBUTE[$key]
    open: $MAP_ATTRIBUTE[$open]
    savedAs: $MAP_ATTRIBUTE[$savedAs]
    default: $MAP_ATTRIBUTE[$default]
  }
>

type MapAttributeFreezer = <$MAP_ATTRIBUTE extends $MapAttribute>(
  $mapAttribute: $MAP_ATTRIBUTE,
  path: string
) => FreezeMapAttribute<$MAP_ATTRIBUTE>

/**
 * Freezes a map instance
 *
 * @param $mapAttribute MapAttribute
 * @param path _(optional)_ Path of the instance in the related item (string)
 * @return void
 */
export const freezeMapAttribute: MapAttributeFreezer = <$MAP_ATTRIBUTE extends $MapAttribute>(
  $mapAttribute: $MAP_ATTRIBUTE,
  path: string
) => {
  validateAttributeProperties($mapAttribute, path)

  const attributesSavedAs = new Set<string>()

  const keyAttributesNames = new Set<string>()

  const requiredAttributesNames: Record<RequiredOption, Set<string>> = {
    always: new Set(),
    atLeastOnce: new Set(),
    onlyOnce: new Set(),
    never: new Set()
  }

  const attributes: $MAP_ATTRIBUTE[$attributes] = $mapAttribute[$attributes]
  const frozenAttributes: {
    [KEY in keyof $MAP_ATTRIBUTE[$attributes]]: FreezeAttribute<$MAP_ATTRIBUTE[$attributes][KEY]>
  } = {} as any

  for (const attributeName in attributes) {
    const attribute = attributes[attributeName]

    const attributeSavedAs = attribute[$savedAs] ?? attributeName
    if (attributesSavedAs.has(attributeSavedAs)) {
      throw new DuplicateSavedAsAttributesError({ duplicatedSavedAs: attributeSavedAs, path })
    }
    attributesSavedAs.add(attributeSavedAs)

    if (attribute[$key]) {
      keyAttributesNames.add(attributeName)
    }

    requiredAttributesNames[attribute[$required]].add(attributeName)

    frozenAttributes[attributeName] = freezeAttribute(attribute, [path, attributeName].join('.'))
  }

  return {
    path,
    type: $mapAttribute[$type],
    attributes: frozenAttributes,
    keyAttributesNames,
    requiredAttributesNames,
    required: $mapAttribute[$required],
    hidden: $mapAttribute[$hidden],
    key: $mapAttribute[$key],
    open: $mapAttribute[$open],
    savedAs: $mapAttribute[$savedAs],
    default: $mapAttribute[$default]
  }
}

export class DuplicateSavedAsAttributesError extends Error {
  constructor({ duplicatedSavedAs, path }: { duplicatedSavedAs: string; path: string }) {
    super(
      `Invalid map attributes at path ${path}: More than two attributes are saved as '${duplicatedSavedAs}'`
    )
  }
}
