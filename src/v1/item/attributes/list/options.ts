import type { AttributeOptions } from '../shared/options'
import { ComputedDefault, RequiredOption, Never } from '../constants'

/**
 * Input options of List Attribute
 */
export interface ListAttributeOptions<
  IS_REQUIRED extends RequiredOption = RequiredOption,
  IS_HIDDEN extends boolean = boolean,
  IS_KEY extends boolean = boolean,
  SAVED_AS extends string | undefined = string | undefined,
  DEFAULT extends ComputedDefault | undefined = ComputedDefault | undefined
> extends AttributeOptions<IS_REQUIRED, IS_HIDDEN, IS_KEY, SAVED_AS> {
  /**
   * Tag attribute as having a computed default value
   */
  default: DEFAULT
}

export const LIST_DEFAULT_OPTIONS: ListAttributeOptions<
  Never,
  false,
  false,
  undefined,
  undefined
> = {
  required: 'never',
  hidden: false,
  key: false,
  savedAs: undefined,
  default: undefined
}