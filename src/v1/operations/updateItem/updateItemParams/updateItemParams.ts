import type { UpdateCommandInput } from '@aws-sdk/lib-dynamodb'
import isEmpty from 'lodash.isempty'
import omit from 'lodash.omit'

import type { EntityV2 } from 'v1/entity'
import { collapseSchemaParsedInput } from 'v1/validation/collapseParsedInput'
import { parsePrimaryKey } from 'v1/operations/utils/parsePrimaryKey'

import type { UpdateItemInput } from '../types'
import type { UpdateItemOptions } from '../options'
import { parseUpdate } from '../updateExpression'

import { parseEntityUpdateCommandInput } from './parseUpdateCommandInput'
import { parseUpdateItemOptions } from './parseUpdateItemOptions'
import { collapseUpdateExtension } from './extension/collapseExtension'

export const updateItemParams = <
  ENTITY extends EntityV2,
  OPTIONS extends UpdateItemOptions<ENTITY>
>(
  entity: ENTITY,
  input: UpdateItemInput<ENTITY>,
  updateItemOptions: OPTIONS = {} as OPTIONS
): UpdateCommandInput => {
  const validInput = parseEntityUpdateCommandInput(entity, input)
  const collapsedInput = collapseSchemaParsedInput(validInput, {
    collapseExtension: collapseUpdateExtension
  })

  const keyInput = entity.computeKey ? entity.computeKey(validInput) : collapsedInput
  const primaryKey = parsePrimaryKey(entity, keyInput)

  const {
    ExpressionAttributeNames: updateExpressionAttributeNames,
    ExpressionAttributeValues: updateExpressionAttributeValues,
    ...update
  } = parseUpdate(entity, omit(collapsedInput, Object.keys(primaryKey)))

  const {
    ExpressionAttributeNames: optionsExpressionAttributeNames,
    ExpressionAttributeValues: optionsExpressionAttributeValues,
    ...options
  } = parseUpdateItemOptions(entity, updateItemOptions)

  const ExpressionAttributeNames = {
    ...optionsExpressionAttributeNames,
    ...updateExpressionAttributeNames
  }

  const ExpressionAttributeValues = {
    ...optionsExpressionAttributeValues,
    ...updateExpressionAttributeValues
  }

  return {
    TableName: entity.table.getName(),
    Key: primaryKey,
    ...update,
    ...options,
    ...(!isEmpty(ExpressionAttributeNames) ? { ExpressionAttributeNames } : {}),
    ...(!isEmpty(ExpressionAttributeValues) ? { ExpressionAttributeValues } : {})
  }
}