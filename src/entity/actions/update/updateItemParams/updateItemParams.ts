import type { UpdateCommandInput } from '@aws-sdk/lib-dynamodb'

import { EntityParser } from '~/entity/actions/parse/index.js'
import type { Entity } from '~/entity/index.js'
import { isEmpty } from '~/utils/isEmpty.js'
import { omit } from '~/utils/omit.js'

import type { UpdateItemOptions } from '../options.js'
import type { UpdateItemInput } from '../types.js'
import { parseUpdate } from '../updateExpression/index.js'
import { parseUpdateExtension } from './extension/index.js'
import { parseUpdateItemOptions } from './parseUpdateItemOptions.js'

type UpdateItemParamsGetter = <ENTITY extends Entity, OPTIONS extends UpdateItemOptions<ENTITY>>(
  entity: ENTITY,
  input: UpdateItemInput<ENTITY>,
  updateItemOptions?: OPTIONS
) => UpdateCommandInput

export const updateItemParams: UpdateItemParamsGetter = <
  ENTITY extends Entity,
  OPTIONS extends UpdateItemOptions<ENTITY>
>(
  entity: ENTITY,
  input: UpdateItemInput<ENTITY>,
  updateItemOptions: OPTIONS = {} as OPTIONS
) => {
  const { item, key } = entity.build(EntityParser).parse(input, {
    mode: 'update',
    parseExtension: parseUpdateExtension
  })

  const {
    ExpressionAttributeNames: updateExpressionAttributeNames,
    ExpressionAttributeValues: updateExpressionAttributeValues,
    ...update
  } = parseUpdate(entity, omit(item, ...Object.keys(key)))

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
    Key: key,
    ...update,
    ...options,
    ...(!isEmpty(ExpressionAttributeNames) ? { ExpressionAttributeNames } : {}),
    ...(!isEmpty(ExpressionAttributeValues) ? { ExpressionAttributeValues } : {})
  }
}
