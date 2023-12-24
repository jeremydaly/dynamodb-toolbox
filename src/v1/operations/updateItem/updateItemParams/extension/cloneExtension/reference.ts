import cloneDeep from 'lodash.clonedeep'

import type { ExtensionCloner } from 'v1/validation/cloneInputAndAddDefaults/types'
import type { ReferenceExtension, UpdateItemInputExtension } from 'v1/operations/types'
import { cloneAttributeInputAndAddDefaults } from 'v1/validation/cloneInputAndAddDefaults/attribute'
import { isArray } from 'v1/utils/validation/isArray'

import { $GET } from 'v1/operations/updateItem/constants'
import { hasGetOperation } from 'v1/operations/updateItem/utils'

export const cloneReferenceExtension: ExtensionCloner<
  ReferenceExtension,
  UpdateItemInputExtension
> = (attribute, input, options) => {
  if (!hasGetOperation(input)) {
    return {
      isExtension: false,
      basicInput: input
    }
  }

  if (!isArray(input[$GET])) {
    return {
      isExtension: true,
      clonedExtension: { [$GET]: cloneDeep(input[$GET]) }
    }
  }

  const [reference, fallback] = input[$GET]

  return {
    isExtension: true,
    clonedExtension: {
      [$GET]: [
        reference,
        ...(fallback !== undefined
          ? [cloneAttributeInputAndAddDefaults(attribute, fallback, options)]
          : [])
      ]
    }
  }
}