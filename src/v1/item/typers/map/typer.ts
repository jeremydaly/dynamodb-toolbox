import type { O } from 'ts-toolbelt'

import { ComputedDefault, RequiredOption, Never, AtLeastOnce } from '../constants'
import type { MappedProperties, Narrow } from '../types'

import type { Mapped } from './interface'
import { MappedOptions, mappedDefaultOptions } from './options'

type MappedTyper = <
  Properties extends MappedProperties = {},
  IsRequired extends RequiredOption = Never,
  IsHidden extends boolean = false,
  IsKey extends boolean = false,
  IsOpen extends boolean = false,
  SavedAs extends string | undefined = undefined,
  Default extends ComputedDefault | undefined = undefined
>(
  _properties: Narrow<Properties>,
  options?: O.Partial<MappedOptions<IsRequired, IsHidden, IsKey, IsOpen, SavedAs, Default>>
) => Mapped<Properties, IsRequired, IsHidden, IsKey, IsOpen, SavedAs, Default>

/**
 * Define a new map property
 *
 * @param properties Dictionary of properties
 * @param options _(optional)_ Map Options
 */
export const map: MappedTyper = <
  Properties extends MappedProperties = {},
  IsRequired extends RequiredOption = Never,
  IsHidden extends boolean = false,
  IsKey extends boolean = false,
  IsOpen extends boolean = false,
  SavedAs extends string | undefined = undefined,
  Default extends ComputedDefault | undefined = undefined
>(
  properties: Narrow<Properties>,
  options?: O.Partial<MappedOptions<IsRequired, IsHidden, IsKey, IsOpen, SavedAs, Default>>
): Mapped<Properties, IsRequired, IsHidden, IsKey, IsOpen, SavedAs, Default> => {
  const appliedOptions = { ...mappedDefaultOptions, ...options }
  const {
    required: _required,
    hidden: _hidden,
    key: _key,
    open: _open,
    savedAs: _savedAs,
    default: _default
  } = appliedOptions

  return {
    _type: 'map',
    _properties: properties,
    _required,
    _hidden,
    _key,
    _open,
    _savedAs,
    _default,
    required: <NextIsRequired extends RequiredOption = AtLeastOnce>(
      nextRequired: NextIsRequired = ('atLeastOnce' as unknown) as NextIsRequired
    ) => map(properties, { ...appliedOptions, required: nextRequired }),
    hidden: () => map(properties, { ...appliedOptions, hidden: true }),
    key: () => map(properties, { ...appliedOptions, key: true }),
    open: () => map(properties, { ...appliedOptions, open: true }),
    savedAs: nextSavedAs => map(properties, { ...appliedOptions, savedAs: nextSavedAs }),
    default: nextDefault => map(properties, { ...appliedOptions, default: nextDefault })
  } as Mapped<Properties, IsRequired, IsHidden, IsKey, IsOpen, SavedAs, Default>
}
