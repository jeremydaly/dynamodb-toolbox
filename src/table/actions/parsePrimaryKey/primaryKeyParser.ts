import { DynamoDBToolboxError } from '~/errors/dynamoDBToolboxError.js'
import { TableAction } from '~/table/index.js'
import type { Table } from '~/table/index.js'
import type { IndexableKeyType, Key, ResolveIndexableKeyType } from '~/table/types/index.js'
import { validatorsByPrimitiveType } from '~/utils/validation/validatorsByPrimitiveType.js'

/**
 * Returns the TS type of the table's Primary Key
 * @param TABLE Table
 * @returns Object
 */
export type PrimaryKey<TABLE extends Table = Table> = Table extends TABLE
  ? Record<string, ResolveIndexableKeyType<IndexableKeyType>>
  : Key extends TABLE['sortKey']
    ? {
        [KEY in TABLE['partitionKey']['name']]: ResolveIndexableKeyType<
          TABLE['partitionKey']['type']
        >
      }
    : NonNullable<TABLE['sortKey']> extends Key
      ? {
          [KEY in
            | TABLE['partitionKey']['name']
            | NonNullable<TABLE['sortKey']>['name']]: KEY extends TABLE['partitionKey']['name']
            ? ResolveIndexableKeyType<TABLE['partitionKey']['type']>
            : KEY extends NonNullable<TABLE['sortKey']>['name']
              ? ResolveIndexableKeyType<NonNullable<TABLE['sortKey']>['type']>
              : never
        }
      : never

export class PrimaryKeyParser<TABLE extends Table = Table> extends TableAction<TABLE> {
  static actionName = 'parsePrimaryKey' as const

  constructor(table: TABLE) {
    super(table)
  }

  parse(keyInput: { [KEY: string]: unknown }): PrimaryKey<TABLE> {
    const table = this.table
    const { partitionKey, sortKey } = table

    const primaryKey: { [KEY: string]: unknown } = {}

    const partitionKeyValidator = validatorsByPrimitiveType[partitionKey.type]
    const partitionKeyValue = keyInput[partitionKey.name]

    if (!partitionKeyValidator(partitionKeyValue)) {
      throw new DynamoDBToolboxError('actions.parsePrimaryKey.invalidKeyPart', {
        message: `Invalid partition key: ${partitionKey.name}`,
        path: partitionKey.name,
        payload: {
          expected: partitionKey.type,
          received: partitionKeyValue,
          keyPart: 'partitionKey'
        }
      })
    }

    /**
     * @debt type "Make validator act as primitive typeguard"
     */
    primaryKey[partitionKey.name] = partitionKeyValue as number | string | Uint8Array

    if (sortKey === undefined) {
      return primaryKey as PrimaryKey<TABLE>
    }

    const sortKeyValidator = validatorsByPrimitiveType[sortKey.type]
    const sortKeyValue = keyInput[sortKey.name]

    if (!sortKeyValidator(sortKeyValue)) {
      throw new DynamoDBToolboxError('actions.parsePrimaryKey.invalidKeyPart', {
        message: `Invalid sort key: ${sortKey.name}`,
        path: sortKey.name,
        payload: {
          expected: sortKey.type,
          received: sortKeyValue,
          keyPart: 'sortKey'
        }
      })
    }

    /**
     * @debt type "Make validator act as primitive typeguard"
     */
    primaryKey[sortKey.name] = sortKeyValue as number | string | Uint8Array

    return primaryKey as PrimaryKey<TABLE>
  }
}
