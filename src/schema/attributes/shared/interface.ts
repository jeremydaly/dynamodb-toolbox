import type { RequiredOption } from '../constants/requiredOptions.js'

export interface SharedAttributeStateConstraint {
  required: RequiredOption
  hidden: boolean
  key: boolean
  savedAs: string | undefined
  defaults: {
    key: undefined | unknown
    put: undefined | unknown
    update: undefined | unknown
  }
  links: {
    key: undefined | unknown
    put: undefined | unknown
    update: undefined | unknown
  }
}

export interface SharedAttributeState<
  STATE extends SharedAttributeStateConstraint = SharedAttributeStateConstraint
> {
  required: STATE['required']
  hidden: STATE['hidden']
  key: STATE['key']
  savedAs: STATE['savedAs']
  defaults: STATE['defaults']
  links: STATE['links']
}
