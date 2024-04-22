---
title: Scan
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ScanCommand

Performs a [Scan Operation](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html) on a table.

## Usage

```ts
import { ScanCommand } from '@dynamodb-toolbox/table/actions/scan'

const scanCommand = PokeTable.build(ScanCommand)

const params = scanCommand.params()
const { Items } = await scanCommand.send()
```

## Entities

Provides a list of entities to filter the returned items (via the internal [`entity`](TODO) attribute). Will also format them and type the response.

<!-- It also enables validation of projection expression and filters. and PARSING. -->

```ts
// 👇 Typed as (Pokemon | Trainer)[]
const { Items } = await PokeTable.build(ScanCommand)
  .entities(PokemonEntity, TrainerEntity)
  .send()
```

## Options

Additional options:

```ts
const { Items } = await PokeTable.build(ScanCommand)
  .options({
    consistent: true,
    limit: 10
    ...
  })
  .send()
```

You can use the `ScanOptions` type to explicitely type an object as a `ScanCommand` options:

```ts
import type { ScanOptions } from '@dynamodb-toolbox/table/actions/scan'

const scanOptions: ScanOptions<
  typeof PokeTable,
  // 👇 Optional entities
  [typeof PokemonEntity, typeof TrainerEntity]
> = {
  consistent: true,
  limit: 10,
  ...
}

const { Items } = await PokeTable.build(ScanCommand)
  .options(scanOptions)
  .send()
```

:::info

It is advised to provide `entities` before `options` as the former will constrain the type of the latter.

:::

Available options are (see the [DynamoDB documentation](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#API_Scan_RequestParameters) for more details):

<table>
    <thead>
        <tr>
            <th>Cat.</th>
            <th>Option</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan="3" align="center" style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}>-</td>
            <td><code>consistent</code></td>
            <td align="center"><code>boolean</code></td>
            <td align="center"><code>false</code></td>
            <td>
              By default, read operations are <b>eventually</b> consistent (which improves performances and reduces costs).
              <br/>
              <br/>Set to <code>true</code> to use <b>strongly</b> consistent reads.
            </td>
        </tr>
        <tr>
            <td><code>index</code></td>
            <td align="center"><code>string</code></td>
            <td align="center">-</td>
            <td>The name of a secondary index to scan.
              <br/>
              <br/>This index can be any local secondary index or global secondary index.</td>
        </tr>
        <tr>
            <td><code>capacity</code></td>
            <td align="center"><code>CapacityOption</code></td>
            <td align="center"><code>"NONE"</code></td>
            <td>
              Determines the level of detail about provisioned or on-demand throughput consumption that is returned in the response.
              <br/>
              <br/>Possible values are <code>"NONE"</code>, <code>"TOTAL"</code> and <code>"INDEXES"</code>.
            </td>
        </tr>
        <tr>
            <td rowspan="3" align="center" style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}><b>Pagination</b></td>
            <td><code>limit</code></td>
            <td align="center"><code>integer ≥ 1</code></td>
            <td align="center">-</td>
            <td>The maximum number of items to evaluate for 1 page.<br/><br/>Note that DynamoDB may return a lower number of items if it reaches the limit of 1MB, or if filters are applied.</td>
        </tr>
        <tr>
            <td><code>exclusiveStartKey</code></td>
            <td align="center"><code>Key</code></td>
            <td align="center">-</td>
            <td>The primary key of the first item that this operation will evaluate. Use the <code>LastEvaluatedKey</code> from the previous operation.</td>
        </tr>
        <tr>
            <td><code>maxPages</code></td>
            <td align="center"><code>integer ≥ 1</code></td>
            <td align="center"><code>1</code></td>
            <td>A "meta" option provided by DynamoDB-Toolbox to send multiple requests in a single promise.<br/><br/>Note that <code>Infinity</code> is a valid (albeit dangerous) option.<br/><br/>If two pages or more have been fetched, the responses <code>Count</code> and <code>ScannedCount</code> will be summed, but the <code>ConsumedCapacity</code> will be omitted for the moment.</td>
        </tr>
        <tr>
            <td rowspan="3" align="center" style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}><b>Filters</b></td>
            <td><code>select</code></td>
            <td align="center"><code>SelectOption</code></td>
            <td align="center">-</td>
            <td>The strategy for returned attributes. You can retrieve all attributes, specific attributes, the count of matching items, or in the case of an index, some or all of the projected attributes.<br/><br/>Possible values are <code>"ALL_ATTRIBUTES"</code>, <code>"ALL_PROJECTED_ATTRIBUTES"</code> (if <code>index</code> is specified), <code>"COUNT"</code> and <code>"SPECIFIC_ATTRIBUTES"</code> (if <code>attributes</code> are specified)
            </td>
        </tr>
        <tr>
            <td><code>filters</code></td>
            <td align="center"><code>Record&lt;string, Condition&gt;</code></td>
            <td align="center">-</td>
            <td>For each entity name, a condition that must be satisfied in order for evaluated items of this entity to be returned (improves performances but does not reduce costs).
              <br/><br/>See <a href="TODO">Condition</a> for more details on how to write conditions.
              <br/><br/>Requires <a href="#entities"><code>entities</code></a>.
            </td>
        </tr>
        <tr>
            <td><code>attributes</code></td>
            <td align="center"><code>string[]</code></td>
            <td align="center">-</td>
            <td>To specify a list of attributes to retrieve (improves performances but does not reduce costs).<br/><br/>See <a href="TODO">Filtering Attributes</a> for more details on how to filter attributes.<br/><br/>Requires <a href="#entities"><code>entities</code></a>. Paths must be common to all entities.</td>
        </tr>
        <tr>
            <td rowspan="2" align="center" style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}><b>Parallel</b></td>
            <td><code>segment</code></td>
            <td align="center"><code>integer ≥ 0</code></td>
            <td align="center">-</td>
            <td>Identifies an individual segment to be scanned by an application worker (zero-based).<br/><br/><code>totalSegments</code> must be provided.</td>
        </tr>
        <tr>
            <td><code>totalSegment</code></td>
            <td align="center"><code>integer ≥ 1</code></td>
            <td align="center">-</td>
            <td>Represents the total number of segments into which the Scan operation will be divided.<br/><br/><code>segment</code> must be provided.</td>
        </tr>
    </tbody>
</table>

:::noteExamples

<Tabs>
<TabItem value="consistent" label="Strongly consistent">

```ts
const { Items } = await PokeTable.build(ScanCommand)
  .options({ consistent: true })
  .send()
```

</TabItem>
<TabItem value="indexed" label="On index">

```ts
const { Items } = await PokeTable.build(ScanCommand)
  .options({ index: 'my-index' })
  .send()
```

</TabItem>
</Tabs>

:::

:::notePaginated

<Tabs>
<TabItem value="paginated" label="Paginated">

```ts
let lastEvaluatedKey:
  | Record<string, unknown>
  | undefined = undefined
const command = PokeTable.build(ScanCommand)

do {
  const page = await command
    .options({ exclusiveStartKey: lastEvaluatedKey })
    .send()

  // ...do something with page.Items here...

  lastEvaluatedKey = page.LastEvaluatedKey
} while (lastEvaluatedKey !== undefined)
```

</TabItem>
<TabItem value="db" label="All DB">

```ts
const { Items } = await PokeTable.build(ScanCommand)
  // Retrieve all items from the table (beware of RAM issues!)
  .options({ maxPages: Infinity })
  .send()
```

</TabItem>

<TabItem value="entity" label="All Pokemons">

```ts
const { Items } = await PokeTable.build(ScanCommand)
  .entities(PokemonEntity)
  // Retrieve all pokemons from the table (beware of RAM issues!)
  .options({ maxPages: Infinity })
  .send()
```

</TabItem>
</Tabs>

:::

:::noteFiltered

<Tabs>
<TabItem value="filtered" label="Filtered">

```ts
const { Items } = await PokeTable.build(ScanCommand)
  .entities(PokemonEntity, TrainerEntity)
  .options({
    filters: {
      POKEMONS: { attr: 'type', eq: 'fire' },
      TRAINERS: { attr: 'age', gt: 18 }
    }
  })
  .send()
```

</TabItem>
<TabItem value="attributes" label="Attributes">

```ts
const { Items } = await PokeTable.build(ScanCommand)
  .entities(PokemonEntity)
  .options({ attributes: ['name', 'type'] })
  .send()
```

</TabItem>
<TabItem value="count" label="Count">

```ts
const { Count } = await PokeTable.build(ScanCommand)
  .options({ select: 'COUNT' })
  .send()
```

</TabItem>
</Tabs>

:::

:::noteParallel

<Tabs>
<TabItem value="segment" label="Segment">

```ts
const { Items } = await PokeTable.build(ScanCommand)
  .options({ segment: 1, totalSegment: 3 })
  .send()
```

</TabItem>
<TabItem value="db" label="All DB (3 threads)">

```ts
const opts = { totalSegment: 3, maxPages: Infinity }

const [
  { Items: segment1 = [] },
  { Items: segment2 = [] },
  { Items: segment3 = [] }
] = await Promise.all([
  PokeTable.build(ScanCommand)
    .options({ segment: 0, ...opts })
    .send(),
  PokeTable.build(ScanCommand)
    .options({ segment: 1, ...opts })
    .send(),
  PokeTable.build(ScanCommand)
    .options({ segment: 2, ...opts })
    .send()
])

const allItems = [...segment1, ...segment2, ...segment3]
```

</TabItem>
</Tabs>

:::

## Response

The data is returned with the same response syntax as the [DynamoDB Scan API](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html#API_Scan_ResponseElements).

If a list of `entities` has been provided, the response `Items` will be formatted by their respective entities.

You can use the `ScanResponse` type to explicitely type an object as a `ScanCommand` response:

```ts
import type { ScanResponse } from '@dynamodb-toolbox/table/actions/scan'

const scanResponse: ScanResponse<
  typeof PokeTable,
  // 👇 Optional entities
  [typeof PokemonEntity],
  // 👇 Optional options
  { attributes: ['name', 'type'] }
> = { Items: ... }
```