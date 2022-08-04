import { A } from 'ts-toolbelt'

import { string, number, boolean, binary } from './leaf'

describe('leaf', () => {
  describe('string', () => {
    it('returns default string', () => {
      const str = string()

      const assertStr: A.Contains<
        typeof str,
        {
          _type: 'string'
          _resolved?: string
          _required: false
          _hidden: false
          _default: undefined
        }
      > = 1
      assertStr

      expect(str).toMatchObject({
        _type: 'string',
        _required: false,
        _hidden: false,
        _default: undefined
      })
    })

    it('returns required string (option)', () => {
      const str = string({ required: true })

      const assertStr: A.Contains<
        typeof str,
        {
          _type: 'string'
          _resolved?: string
          _required: true
          _hidden: false
          _default: undefined
        }
      > = 1
      assertStr

      expect(str).toMatchObject({
        _type: 'string',
        _required: true,
        _hidden: false,
        _default: undefined
      })
    })

    it('returns required string (method)', () => {
      const str = string().required()

      const assertStr: A.Contains<
        typeof str,
        {
          _type: 'string'
          _resolved?: string
          _required: true
          _hidden: false
          _default: undefined
        }
      > = 1
      assertStr

      expect(str).toMatchObject({
        _type: 'string',
        _required: true,
        _hidden: false,
        _default: undefined
      })
    })

    it('returns hidden string (option)', () => {
      const str = string({ hidden: true })

      const assertStr: A.Contains<
        typeof str,
        {
          _type: 'string'
          _resolved?: string
          _required: false
          _hidden: true
          _default: undefined
        }
      > = 1
      assertStr

      expect(str).toMatchObject({
        _type: 'string',
        _required: false,
        _hidden: true,
        _default: undefined
      })
    })

    it('returns hidden string (method)', () => {
      const str = string().hidden()

      const assertStr: A.Contains<
        typeof str,
        {
          _type: 'string'
          _resolved?: string
          _required: false
          _hidden: true
          _default: undefined
        }
      > = 1
      assertStr

      expect(str).toMatchObject({
        _type: 'string',
        _required: false,
        _hidden: true,
        _default: undefined
      })
    })

    it('returns string with default value (option)', () => {
      // @ts-expect-error
      string({ default: 42 })
      // @ts-expect-error
      string({ default: () => 42 })

      const strA = string({ default: 'hello' })
      const sayHello = () => 'hello'
      const strB = string({ default: sayHello })

      const assertStrA: A.Contains<
        typeof strA,
        {
          _type: 'string'
          _resolved?: string
          _required: false
          _hidden: false
          _default: 'hello'
        }
      > = 1
      assertStrA

      expect(strA).toMatchObject({
        _type: 'string',
        _required: false,
        _hidden: false,
        _default: 'hello'
      })

      const assertStrB: A.Contains<
        typeof strB,
        {
          _type: 'string'
          _resolved?: string
          _required: false
          _hidden: false
          _default: () => string
        }
      > = 1
      assertStrB

      expect(strB).toMatchObject({
        _type: 'string',
        _required: false,
        _hidden: false,
        _default: sayHello
      })
    })

    it('returns string with default value (method)', () => {
      // @ts-expect-error
      string().default(42)
      // @ts-expect-error
      string().default(() => 42)

      const strA = string().default('hello')
      const sayHello = () => 'hello'
      const strB = string().default(sayHello)

      const assertStrA: A.Contains<
        typeof strA,
        {
          _type: 'string'
          _resolved?: string
          _required: false
          _hidden: false
          _default: 'hello'
        }
      > = 1
      assertStrA

      expect(strA).toMatchObject({
        _type: 'string',
        _required: false,
        _hidden: false,
        _default: 'hello'
      })

      const assertStrB: A.Contains<
        typeof strB,
        {
          _type: 'string'
          _resolved?: string
          _required: false
          _hidden: false
          _default: () => string
        }
      > = 1
      assertStrB

      expect(strB).toMatchObject({
        _type: 'string',
        _required: false,
        _hidden: false,
        _default: sayHello
      })
    })
  })

  describe('number', () => {
    it('returns default number', () => {
      const num = number()

      const assertNum: A.Contains<
        typeof num,
        {
          _type: 'number'
          _resolved?: number
          _required: false
          _hidden: false
          _default: undefined
        }
      > = 1
      assertNum

      expect(num).toMatchObject({
        _type: 'number',
        _required: false,
        _hidden: false,
        _default: undefined
      })
    })
  })

  describe('boolean', () => {
    it('returns default boolean', () => {
      const bool = boolean()

      const assertBool: A.Contains<
        typeof bool,
        {
          _type: 'boolean'
          _resolved?: boolean
          _required: false
          _hidden: false
          _default: undefined
        }
      > = 1
      assertBool

      expect(bool).toMatchObject({
        _type: 'boolean',
        _required: false,
        _hidden: false,
        _default: undefined
      })
    })
  })

  describe('binary', () => {
    it('returns default binary', () => {
      const bin = binary()

      const assertBin: A.Contains<
        typeof bin,
        {
          _type: 'binary'
          _resolved?: unknown
          _required: false
          _hidden: false
          _default: undefined
        }
      > = 1
      assertBin

      expect(bin).toMatchObject({
        _type: 'binary',
        _required: false,
        _hidden: false,
        _default: undefined
      })
    })
  })
})
