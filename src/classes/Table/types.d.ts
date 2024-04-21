import { ReturnConsumedCapacity, ReturnItemCollectionMetrics, Select } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommandInput, TransactGetCommandInput } from '@aws-sdk/lib-dynamodb';
import type { A, O } from 'ts-toolbelt';
import type { ProjectionAttributes } from '../../lib/projectionBuilder.js';
import type { FilterExpressions } from '../../lib/expressionBuilder.js';
import type { $ReadOptions, ConditionsOrFilters } from '../Entity/types.js';
import type Table from './Table.js';
export interface TableConstructor<Name extends string, PartitionKey extends A.Key, SortKey extends A.Key | null> {
    name: Name;
    alias?: string | null;
    partitionKey: PartitionKey;
    sortKey?: SortKey;
    entityField?: boolean | string;
    attributes?: TableAttributes;
    indexes?: TableIndexes;
    autoExecute?: boolean;
    autoParse?: boolean;
    DocumentClient?: DynamoDBDocumentClient;
    entities?: {};
    removeNullAttributes?: boolean;
}
export declare type DynamoDBTypes = 'string' | 'boolean' | 'number' | 'bigint' | 'list' | 'map' | 'binary' | 'set';
export declare type DynamoDBKeyTypes = 'string' | 'number' | 'bigint' | 'binary';
export interface executeParse {
    execute?: boolean;
    parse?: boolean;
}
export interface TableAttributeConfig {
    type: DynamoDBTypes;
    setType?: DynamoDBKeyTypes;
}
export interface TableAttributes {
    [attr: string]: DynamoDBTypes | TableAttributeConfig;
}
export interface ParsedTableAttribute {
    [attr: string]: TableAttributeConfig & {
        mappings: {};
    };
}
export interface TableIndexes {
    [index: string]: {
        partitionKey?: string;
        sortKey?: string;
    };
}
export declare type TableReadOptions = {
    index: string;
    limit: number;
    entity: string;
    parseAsEntity: string;
};
export declare type $QueryOptions<Execute extends boolean | undefined = undefined, Parse extends boolean | undefined = undefined> = $ReadOptions<Execute, Parse> & TableReadOptions & {
    reverse: boolean;
    select: Select | `${Select}` | Lowercase<Select>;
    eq: string | number | bigint;
    lt: string | number | bigint;
    lte: string | number | bigint;
    gt: string | number | bigint;
    gte: string | number | bigint;
    between: [string, string] | [number, number] | [bigint, bigint];
    beginsWith: string;
    startKey: {};
};
export declare type TableQueryOptions<Execute extends boolean | undefined = undefined, Parse extends boolean | undefined = undefined> = O.Partial<$QueryOptions<Execute, Parse> & {
    attributes: ProjectionAttributes;
    filters: ConditionsOrFilters<A.Key>;
}>;
export declare type ScanOptions<Execute extends boolean | undefined = undefined, Parse extends boolean | undefined = undefined> = O.Partial<$ReadOptions<Execute, Parse> & TableReadOptions & {
    attributes?: ProjectionAttributes;
    filters?: FilterExpressions;
    startKey?: {};
    segments?: number;
    segment?: number;
    capacity?: ReturnConsumedCapacity | `${ReturnConsumedCapacity}` | Lowercase<ReturnConsumedCapacity>;
    select?: Select | `${Select}` | Lowercase<Select>;
}>;
export interface BatchGetOptions {
    consistent?: boolean | {
        [tableName: string]: boolean;
    };
    capacity?: ReturnConsumedCapacity | `${ReturnConsumedCapacity}` | Lowercase<ReturnConsumedCapacity>;
    attributes?: ProjectionAttributes;
    include?: string[];
    execute?: boolean;
    parse?: boolean;
}
export interface BatchGetParamsMeta {
    payload: any;
    Tables: {
        [key: string]: TableDef;
    };
    EntityProjections: {
        [key: string]: any;
    };
    TableProjections: {
        [key: string]: string[];
    };
}
export interface batchWriteOptions {
    capacity?: ReturnConsumedCapacity | `${ReturnConsumedCapacity}` | Lowercase<ReturnConsumedCapacity>;
    metrics?: ReturnItemCollectionMetrics | `${ReturnItemCollectionMetrics}` | Lowercase<ReturnItemCollectionMetrics>;
    execute?: boolean;
    parse?: boolean;
}
export interface transactGetParamsOptions {
    capacity?: ReturnConsumedCapacity | `${ReturnConsumedCapacity}` | Lowercase<ReturnConsumedCapacity>;
}
export declare type transactGetOptions = transactGetParamsOptions & executeParse;
export interface transactWriteParamsOptions {
    capacity?: ReturnConsumedCapacity | `${ReturnConsumedCapacity}` | Lowercase<ReturnConsumedCapacity>;
    metrics?: ReturnItemCollectionMetrics | `${ReturnItemCollectionMetrics}` | Lowercase<ReturnItemCollectionMetrics>;
    token?: string;
}
export declare type TransactWriteOptions = transactWriteParamsOptions & executeParse;
export interface TransactGetParamsWithMeta {
    Entities: (any | undefined)[];
    payload: TransactGetCommandInput;
}
export interface ScanParamsWithMeta {
    payload: ScanCommandInput;
    EntityProjections: {
        [key: string]: any;
    };
    TableProjections: {
        [key: string]: string[];
    };
}
export declare type TableDef = Table<string, A.Key, A.Key | null>;
