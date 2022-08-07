import { A } from 'ts-toolbelt'

import { string, number, boolean, binary } from './leaf'
import { ComputedDefault } from './utility'

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
          _savedAs: undefined
          _key: false
          _default: undefined
        }
      > = 1
      assertStr

      expect(str).toMatchObject({
        _type: 'string',
        _required: false,
        _hidden: false,
        _savedAs: undefined,
        _key: false,
        _default: undefined
      })
    })

    it('returns required string (option)', () => {
      const str = string({ required: true })

      const assertStr: A.Contains<typeof str, { _required: true }> = 1
      assertStr

      expect(str).toMatchObject({ _required: true })
    })

    it('returns required string (method)', () => {
      const str = string().required()

      const assertStr: A.Contains<typeof str, { _required: true }> = 1
      assertStr

      expect(str).toMatchObject({ _required: true })
    })

    it('returns hidden string (option)', () => {
      const str = string({ hidden: true })

      const assertStr: A.Contains<typeof str, { _hidden: true }> = 1
      assertStr

      expect(str).toMatchObject({ _hidden: true })
    })

    it('returns hidden string (method)', () => {
      const str = string().hidden()

      const assertStr: A.Contains<typeof str, { _hidden: true }> = 1
      assertStr

      expect(str).toMatchObject({ _hidden: true })
    })

    it('returns key string (option)', () => {
      const str = string({ key: true })

      const assertStr: A.Contains<typeof str, { _key: true }> = 1
      assertStr

      expect(str).toMatchObject({ _key: true })
    })

    it('returns key string (method)', () => {
      const str = string().key()

      const assertStr: A.Contains<typeof str, { _key: true }> = 1
      assertStr

      expect(str).toMatchObject({ _key: true })
    })

    it('returns savedAs string (option)', () => {
      const str = string({ savedAs: 'foo' })

      const assertStr: A.Contains<typeof str, { _savedAs: 'foo' }> = 1
      assertStr

      expect(str).toMatchObject({ _savedAs: 'foo' })
    })

    it('returns savedAs string (method)', () => {
      const str = string().savedAs('foo')

      const assertStr: A.Contains<typeof str, { _savedAs: 'foo' }> = 1
      assertStr

      expect(str).toMatchObject({ _savedAs: 'foo' })
    })

    it('returns string with default value (option)', () => {
      // @ts-expect-error
      string({ default: 42 })
      // @ts-expect-error
      string({ default: () => 42 })

      const strA = string({ default: 'hello' })
      const sayHello = () => 'hello'
      const strB = string({ default: sayHello })

      const assertStrA: A.Contains<typeof strA, { _default: 'hello' }> = 1
      assertStrA

      expect(strA).toMatchObject({ _default: 'hello' })

      const assertStrB: A.Contains<typeof strB, { _default: () => string }> = 1
      assertStrB

      expect(strB).toMatchObject({ _default: sayHello })
    })

    it('returns string with default value (method)', () => {
      // @ts-expect-error
      string().default(42)
      // @ts-expect-error
      string().default(() => 42)

      const strA = string().default('hello')
      const sayHello = () => 'hello'
      const strB = string().default(sayHello)

      const assertStrA: A.Contains<typeof strA, { _default: 'hello' }> = 1
      assertStrA

      expect(strA).toMatchObject({ _default: 'hello' })

      const assertStrB: A.Contains<typeof strB, { _default: () => string }> = 1
      assertStrB

      expect(strB).toMatchObject({ _default: sayHello })
    })
  })

  describe('number', () => {
    it('returns default number', () => {
      const num = number()

      const assertNum: A.Contains<typeof num, { _type: 'number' }> = 1
      assertNum

      expect(num).toMatchObject({ _type: 'number' })
    })
  })

  describe('boolean', () => {
    it('returns default boolean', () => {
      const bool = boolean()

      const assertBool: A.Contains<typeof bool, { _type: 'boolean' }> = 1
      assertBool

      expect(bool).toMatchObject({ _type: 'boolean' })
    })
  })

  describe('binary', () => {
    it('returns default binary', () => {
      const bin = binary()

      const assertBin: A.Contains<typeof bin, { _type: 'binary' }> = 1
      assertBin

      expect(bin).toMatchObject({ _type: 'binary' })
    })
  })

  describe('ComputedDefault', () => {
    it('accepts ComputedDefault as default value (option)', () => {
      const str = string({ default: ComputedDefault })

      const assertStr: A.Contains<typeof str, { _default: ComputedDefault }> = 1
      assertStr

      expect(str).toMatchObject({ _default: ComputedDefault })
    })

    it('accepts ComputedDefault as default value (option)', () => {
      const str = string().default(ComputedDefault)

      const assertStr: A.Contains<typeof str, { _default: ComputedDefault }> = 1
      assertStr

      expect(str).toMatchObject({ _default: ComputedDefault })
    })
  })
})
