const expressionBuilder = require('../lib/expressionBuilder')

// Require Table and Entity classes
const Table = require('../classes/Table')
const Entity = require('../classes/Entity')

// Create basic entity
const TestEntity = new Entity({
  name: 'TestEntity',
  attributes: {
    pk: { partitionKey: true },
    a: 'string',
    b: 'string',
    c: 'string',
    d: 'string',
    x: 'string',
    y: 'string'
  }
})

// Create basic table
const TestTable = new Table({
  name: 'test-table',
  partitionKey: 'pk',
  entities: TestEntity
})


describe('expressionBuilder',() => {

  it('builds complex expression', () => {

    const nested_exp = [
      { attr: 'a', eq: 'b' },
      [
        { attr: 'a', ne: 'b' },
        { attr: 'a', exists: true },
        [{ attr: 'a', between: ['b','c'] }]
      ],
      [
        { attr: 'a', ne: 'b' },
        { attr: 'a', exists: true }
      ],
      [
        { attr: 'a', ne: 'b' },
        { attr: 'a', exists: true }
      ],
      { attr: 'd', eq: 'e' },
      [
        [
          { or: false, attr: 'd', eq: 'e' },
          { or: true, attr: 'y', eq: 'x' },
        ],
        [
          { or: true, attr: 'a', eq: 'b' },
          [
            { or: false, attr: 'a', eq: 'b' },
            { or: true, attr: 'a', eq: 'b', negate:true }
          ]
        ],
        { or: true, attr: 'a', eq: 'b' },
        { or: true, attr: 'a', eq: 'b' }
      ]

    ]

    const result = expressionBuilder(nested_exp,TestTable,'TestEntity')

    expect(result.names).toEqual({
      '#attr1': 'a',
      '#attr2': 'a',
      '#attr3': 'a',
      '#attr4': 'a',
      '#attr5': 'a',
      '#attr6': 'a',
      '#attr7': 'a',
      '#attr8': 'a',
      '#attr9': 'd',
      '#attr10': 'd',
      '#attr11': 'y',
      '#attr12': 'a',
      '#attr13': 'a',
      '#attr14': 'a',
      '#attr15': 'a',
      '#attr16': 'a'
    })

    expect(result.values).toEqual({
      ':attr1': 'b',
      ':attr2': 'b',
      ':attr4_0': 'b',
      ':attr4_1': 'c',
      ':attr5': 'b',
      ':attr7': 'b',
      ':attr9': 'e',
      ':attr10': 'e',
      ':attr11': 'x',
      ':attr12': 'b',
      ':attr13': 'b',
      ':attr14': 'b',
      ':attr15': 'b',
      ':attr16': 'b'
    })

    expect(result.expression).toBe('#attr1 = :attr1 AND (#attr2 <> :attr2 AND attribute_exists(#attr3) AND (#attr4 between :attr4_0 and :attr4_1)) AND (#attr5 <> :attr5 AND attribute_exists(#attr6)) AND (#attr7 <> :attr7 AND attribute_exists(#attr8)) AND #attr9 = :attr9 AND ((#attr10 = :attr10 OR #attr11 = :attr11) OR (#attr12 = :attr12 AND (#attr13 = :attr13 OR (NOT #attr14 = :attr14))) OR #attr15 = :attr15 OR #attr16 = :attr16)')

  })

  it('coerces expression input to array', () => {
    let result = expressionBuilder({ attr: 'a', eq: 'b' },TestTable,'TestEntity')
    expect(result.names).toEqual({ '#attr1': 'a' })
    expect(result.values).toEqual({ ':attr1': 'b' })
  })

  it('fail with conditional operator errors', () => {
    expect(() => expressionBuilder({ attr: 'a', eq: 'b', ne: 'b' },TestTable,'TestEntity'))
      .toThrow(`You can only supply one filter condition per query. Already using 'eq'`)
    expect(() => expressionBuilder({ attr: 'a', eq: 'b', in: ['b'] },TestTable,'TestEntity'))
      .toThrow(`You can only supply one filter condition per query. Already using 'eq'`)
    expect(() => expressionBuilder({ attr: 'a', eq: 'b', lt: 'b' },TestTable,'TestEntity'))
      .toThrow(`You can only supply one filter condition per query. Already using 'eq'`)
    expect(() => expressionBuilder({ attr: 'a', eq: 'b', lte: 'b' },TestTable,'TestEntity'))
      .toThrow(`You can only supply one filter condition per query. Already using 'eq'`)
    expect(() => expressionBuilder({ attr: 'a', eq: 'b', gt: 'b' },TestTable,'TestEntity'))
      .toThrow(`You can only supply one filter condition per query. Already using 'eq'`)
    expect(() => expressionBuilder({ attr: 'a', eq: 'b', gte: 'b' },TestTable,'TestEntity'))
      .toThrow(`You can only supply one filter condition per query. Already using 'eq'`)
    expect(() => expressionBuilder({ attr: 'a', eq: 'b', between: ['b','c'] },TestTable,'TestEntity'))
      .toThrow(`You can only supply one filter condition per query. Already using 'eq'`)
    expect(() => expressionBuilder({ attr: 'a', eq: 'b', exists: 'b' },TestTable,'TestEntity'))
      .toThrow(`You can only supply one filter condition per query. Already using 'eq'`)
    expect(() => expressionBuilder({ attr: 'a', eq: 'b', contains: 'b' },TestTable,'TestEntity'))
      .toThrow(`You can only supply one filter condition per query. Already using 'eq'`)
    expect(() => expressionBuilder({ attr: 'a', eq: 'b', beginsWith: 'b' },TestTable,'TestEntity'))
      .toThrow(`You can only supply one filter condition per query. Already using 'eq'`)
    expect(() => expressionBuilder({ attr: 'a', eq: 'b', type: 'string' },TestTable,'TestEntity'))
      .toThrow(`You can only supply one filter condition per query. Already using 'eq'`)
  })

  it('fails with unknown arguments', () => {
    expect(() => expressionBuilder({ attr: 'a', eq: 'b', invalidArg: true },TestTable,'TestEntity'))
      .toThrow(`Invalid expression options: invalidArg`)
  })

  it('fails with invalid entity', () => {
    expect(() => expressionBuilder({ attr: 'a', eq: 'b' },TestTable,'UnknownEntity'))
      .toThrow(`'entity' value of 'UnknownEntity' must be a string and a valid table Entity name`)
  })

  it('fails when no attr or size argument', () => {
    expect(() => expressionBuilder({ eq: 'b' },TestTable,'TestEntity'))
      .toThrow(`A string for 'attr' or 'size' is required for condition expressions`)
  })

  it('falls back to table attributes if no entity specified', () => {
    let result = expressionBuilder({ attr: 'a', eq: 'b' },TestTable)
    expect(result.names).toEqual({ '#attr1': 'a' })
    expect(result.values).toEqual({ ':attr1': 'b' })
  })

  it('uses size value and checks entity attribute', () => {
    let result = expressionBuilder({ size: 'a', eq: 'b' },TestTable,'TestEntity')
    expect(result.expression).toBe('size(#attr1) = :attr1')
    expect(result.names).toEqual({ '#attr1': 'a' })
    expect(result.values).toEqual({ ':attr1': 'b' })
  })

  it('uses size value and checks table attribute', () => {
    let result = expressionBuilder({ size: 'a', eq: 'b' },TestTable)
    expect(result.expression).toBe('size(#attr1) = :attr1')
    expect(result.names).toEqual({ '#attr1': 'a' })
    expect(result.values).toEqual({ ':attr1': 'b' })
  })

  it(`generates an 'eq' clause`, () => {
    let result = expressionBuilder({ attr: 'a', eq: 'b' },TestTable,'TestEntity')
    expect(result.expression).toBe('#attr1 = :attr1')
    expect(result.names).toEqual({ '#attr1': 'a' })
    expect(result.values).toEqual({ ':attr1': 'b' })
  })

  it(`generates a 'ne' clause`, () => {
    let result = expressionBuilder({ attr: 'a', ne: 'b' },TestTable,'TestEntity')
    expect(result.expression).toBe('#attr1 <> :attr1')
    expect(result.names).toEqual({ '#attr1': 'a' })
    expect(result.values).toEqual({ ':attr1': 'b' })
  })

  it(`generates an 'in' clause`, () => {
    let result = expressionBuilder({ attr: 'a', in: ['b','c'] },TestTable,'TestEntity')
    expect(result.expression).toBe('#attr1 IN (:attr1_0,:attr1_1)')
    expect(result.names).toEqual({ '#attr1': 'a' })
    expect(result.values).toEqual({ ':attr1_0': 'b', ':attr1_1': 'c' })
  })

  it(`generates a 'lt' clause`, () => {
    let result = expressionBuilder({ attr: 'a', lt: 'b' },TestTable,'TestEntity')
    expect(result.expression).toBe('#attr1 < :attr1')
    expect(result.names).toEqual({ '#attr1': 'a' })
    expect(result.values).toEqual({ ':attr1': 'b' })
  })

  it(`generates a 'lte' clause`, () => {
    let result = expressionBuilder({ attr: 'a', lte: 'b' },TestTable,'TestEntity')
    expect(result.expression).toBe('#attr1 <= :attr1')
    expect(result.names).toEqual({ '#attr1': 'a' })
    expect(result.values).toEqual({ ':attr1': 'b' })
  })

  it(`generates a 'gt' clause`, () => {
    let result = expressionBuilder({ attr: 'a', gt: 'b' },TestTable,'TestEntity')
    expect(result.expression).toBe('#attr1 > :attr1')
    expect(result.names).toEqual({ '#attr1': 'a' })
    expect(result.values).toEqual({ ':attr1': 'b' })
  })

  it(`generates a 'gte' clause`, () => {
    let result = expressionBuilder({ attr: 'a', gte: 'b' },TestTable,'TestEntity')
    expect(result.expression).toBe('#attr1 >= :attr1')
    expect(result.names).toEqual({ '#attr1': 'a' })
    expect(result.values).toEqual({ ':attr1': 'b' })
  })

  it(`generates a 'between' clause`, () => {
    let result = expressionBuilder({ attr: 'a', between: ['b','c'] },TestTable,'TestEntity')
    expect(result.expression).toBe('#attr1 between :attr1_0 and :attr1_1')
    expect(result.names).toEqual({ '#attr1': 'a' })
    expect(result.values).toEqual({ ':attr1_0': 'b',':attr1_1': 'c' })
  })

  it(`generates a 'between' clause with 'size'`, () => {
    let result = expressionBuilder({ size: 'a', between: ['b','c'] },TestTable,'TestEntity')
    expect(result.expression).toBe('size(#attr1) between :attr1_0 and :attr1_1')
    expect(result.names).toEqual({ '#attr1': 'a' })
    expect(result.values).toEqual({ ':attr1_0': 'b',':attr1_1': 'c' })
  })

  it(`generates an 'exists' clause`, () => {
    let result = expressionBuilder({ attr: 'a', exists: true },TestTable,'TestEntity')
    expect(result.expression).toBe('attribute_exists(#attr1)')
    expect(result.names).toEqual({ '#attr1': 'a' })
  })

  it(`generates a 'not exists' clause`, () => {
    let result = expressionBuilder({ attr: 'a', exists: false },TestTable,'TestEntity')
    expect(result.expression).toBe('attribute_not_exists(#attr1)')
    expect(result.names).toEqual({ '#attr1': 'a' })
  })

  it(`generates a 'contains' clause`, () => {
    let result = expressionBuilder({ attr: 'a', contains: 'b' },TestTable,'TestEntity')
    expect(result.expression).toBe('contains(#attr1,:attr1)')
    expect(result.names).toEqual({ '#attr1': 'a' })
    expect(result.values).toEqual({ ':attr1': 'b' })
  })

  it(`generates a 'beginsWith' clause`, () => {
    let result = expressionBuilder({ attr: 'a', beginsWith: 'b' },TestTable,'TestEntity')
    expect(result.expression).toBe('begins_with(#attr1,:attr1)')
    expect(result.names).toEqual({ '#attr1': 'a' })
    expect(result.values).toEqual({ ':attr1': 'b' })
  })

  it(`generates a 'type' clause`, () => {
    let result = expressionBuilder({ attr: 'a', type: 'b' },TestTable,'TestEntity')
    expect(result.expression).toBe('attribute_type(#attr1,:attr1)')
    expect(result.names).toEqual({ '#attr1': 'a' })
    expect(result.values).toEqual({ ':attr1': 'b' })
  })

  it(`fails when 'between' value is not an array`, () => {
    expect(() => expressionBuilder({ attr: 'a', between: 'b' },TestTable,'TestEntity'))
      .toThrow(`'between' conditions require an array with two values.`)
  })

  it(`fails when 'in' value is not an array`, () => {
    expect(() => expressionBuilder({ attr: 'a', in: 'b' },TestTable,'TestEntity'))
      .toThrow(`'in' conditions require an array.`)
  })

  it(`fails when 'in' clause doesn't have an attr`, () => {
    expect(() => expressionBuilder({ size: 'a', in: ['b'] },TestTable,'TestEntity'))
      .toThrow(`'in' conditions require an 'attr'.`)
  })

  it(`fails when 'exists' clause doesn't have an attr`, () => {
    expect(() => expressionBuilder({ size: 'a', exists: true },TestTable,'TestEntity'))
      .toThrow(`'exists' conditions require an 'attr'.`)
  })

  it(`fails when 'beginsWith' clause doesn't have an attr`, () => {
    expect(() => expressionBuilder({ size: 'a', beginsWith: 'b' },TestTable,'TestEntity'))
      .toThrow(`'beginsWith' conditions require an 'attr'.`)
  })

  it(`fails when 'contains' clause doesn't have an attr`, () => {
    expect(() => expressionBuilder({ size: 'a', contains: 'b' },TestTable,'TestEntity'))
      .toThrow(`'contains' conditions require an 'attr'.`)
  })

  it(`fails when 'type' clause doesn't have an attr`, () => {
    expect(() => expressionBuilder({ size: 'a', type: 'b' },TestTable,'TestEntity'))
      .toThrow(`'type' conditions require an 'attr'.`)
  })

  it(`fails when no condition is provided`, () => {
    expect(() => expressionBuilder({ attr: 'a' },TestTable,'TestEntity'))
      .toThrow(`A condition is required`)
  })
})



// const exp = [
    //   { attr: 'a', eq: 'b' },
    //   { attr: 'a', ne: 'b' },
    //   { attr: 'a', lt: 'b' },
    //   { attr: 'a', lte: 'b' },
    //   { attr: 'a', gt: 'b' },
    //   { attr: 'a', gte: 'b' },
    //   { attr: 'a', between: ['b','c'] },
    //   { attr: 'a', in: ['b','c','d'] },
    //   { attr: 'a', exists: true },
    //   { attr: 'a', exists: false },
    //   { attr: 'a', contains: 'b' },
    //   { attr: 'a', beginsWith: 'b' },
    //   { attr: 'a', type: 'string' },
    //   { size: 'a', eq: 'b' },
    //   { size: 'a', between: [1,5] },
    //   { attr: 'a', eq: 'b', negate: true },
    //   { attr: 'a', beginsWith: 'b', negate: true }
    // ]
