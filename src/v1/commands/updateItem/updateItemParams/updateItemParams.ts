import type { UpdateCommandInput } from '@aws-sdk/lib-dynamodb'
import isEmpty from 'lodash.isempty'

import type { EntityV2 } from 'v1/entity'
import { renameSavedAsAttributes } from 'v1/validation/renameSavedAsAttributes'
import { parsePrimaryKey } from 'v1/commands/utils/parsePrimaryKey'
import { parseSchemaUpdate } from 'v1/commands/utils/parseUpdate'

import type { UpdateItemInput } from '../types'
import type { UpdateItemOptions } from '../options'

import { parseEntityUpdateCommandInput } from './parseUpdateCommandInput'
import { parseUpdateItemOptions } from './parseUpdateItemOptions'
import { renameUpdateExtension } from './extension/renameExtension'

export const updateItemParams = <
  ENTITY extends EntityV2,
  OPTIONS extends UpdateItemOptions<ENTITY>
>(
  entity: ENTITY,
  input: UpdateItemInput<ENTITY, false>,
  updateItemOptions: OPTIONS = {} as OPTIONS
): UpdateCommandInput => {
  const validInput = parseEntityUpdateCommandInput(entity, input)
  const renamedInput = renameSavedAsAttributes(validInput, {
    renameExtension: renameUpdateExtension
  })

  const {
    ExpressionAttributeNames: updateExpressionAttributeNames,
    ExpressionAttributeValues: updateExpressionAttributeValues,
    ...update
  } = parseSchemaUpdate(entity.schema, renamedInput)

  const keyInput = entity.computeKey ? entity.computeKey(validInput) : renamedInput
  const primaryKey = parsePrimaryKey(entity, keyInput)

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
    TableName: entity.table.name,
    Key: primaryKey,
    ...update,
    ...options,
    ...(!isEmpty(ExpressionAttributeNames) ? { ExpressionAttributeNames } : {}),
    ...(!isEmpty(ExpressionAttributeValues) ? { ExpressionAttributeValues } : {})
  }
}