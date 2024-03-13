import { DynamoDBToolboxError } from 'v1/errors'
import { record, string } from 'v1/schema'

import { recordAttributeParser } from './record'
import * as attrWorkflowModule from './attribute'

// @ts-ignore
const attrWorkflow = jest.spyOn(attrWorkflowModule, 'attrWorkflow')

const recordAttr = record(string(), string()).freeze('path')

describe('parseRecordAttributeClonedInput', () => {
  beforeEach(() => {
    attrWorkflow.mockClear()
  })

  it('throws an error if input is not a record', () => {
    const invalidCall = () =>
      recordAttributeParser(recordAttr, ['foo', 'bar'], { fill: false }).next()

    expect(invalidCall).toThrow(DynamoDBToolboxError)
    expect(invalidCall).toThrow(expect.objectContaining({ code: 'parsing.invalidAttributeInput' }))
  })

  it('applies parseAttributeClonesInput on input properties otherwise (and pass options)', () => {
    const options = { some: 'options' }
    const parser = recordAttributeParser(
      recordAttr,
      { foo: 'foo1', bar: 'bar1' },
      // @ts-expect-error we don't really care about the type here
      options
    )

    const defaultedState = parser.next()
    expect(defaultedState.done).toBe(false)
    expect(defaultedState.value).toStrictEqual({ foo: 'foo1', bar: 'bar1' })

    expect(attrWorkflow).toHaveBeenCalledTimes(4)
    expect(attrWorkflow).toHaveBeenCalledWith(recordAttr.keys, 'foo', options)
    expect(attrWorkflow).toHaveBeenCalledWith(recordAttr.keys, 'bar', options)
    expect(attrWorkflow).toHaveBeenCalledWith(recordAttr.elements, 'foo1', options)
    expect(attrWorkflow).toHaveBeenCalledWith(recordAttr.elements, 'bar1', options)

    const linkedState = parser.next()
    expect(linkedState.done).toBe(false)
    expect(linkedState.value).toStrictEqual({ foo: 'foo1', bar: 'bar1' })

    const parsedState = parser.next()
    expect(parsedState.done).toBe(false)
    expect(parsedState.value).toStrictEqual({ foo: 'foo1', bar: 'bar1' })

    const transformedState = parser.next()
    expect(transformedState.done).toBe(true)
    expect(transformedState.value).toStrictEqual({ foo: 'foo1', bar: 'bar1' })
  })
})