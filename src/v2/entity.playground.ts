import { ComputedDefault, item, map, number, string, PostComputeDefaults } from './attributes'
import { EntityV2, SavedAs, Input, Output, KeyInputs, KeyOutputs } from './entity'
import { MyTable } from './table.playground'

export const UserEntity = new EntityV2({
  name: 'User',
  table: MyTable,
  item: item({
    userId: string().required().key(),
    age: number().enum(41, 42).default(42).key(),
    firstName: string().required().savedAs('fn'),
    lastName: string().required().savedAs('ln'),
    parents: map({
      father: string().required(),
      mother: string().required()
    }),
    computedDefault: string().required().default(ComputedDefault)
  }),
  computeDefaults: item => ({ ...item, computedDefault: 'something' }),
  computeKey: ({ userId, age }) => ({ userId, sk: age })
})

type UserInput = Input<typeof UserEntity>
type SavedUser = SavedAs<typeof UserEntity>
type UserOutput = Output<typeof UserEntity>
type UserInputKeys = KeyInputs<typeof UserEntity>
type UserOutputKeys = KeyOutputs<typeof UserEntity>
type UserPostComputeDefault = PostComputeDefaults<typeof UserEntity['item']>
