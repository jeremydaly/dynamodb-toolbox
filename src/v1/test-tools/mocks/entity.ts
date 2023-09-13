import type { EntityV2 } from 'v1/entity'
import type { KeyInput } from 'v1/commands'
import { GetItemCommand, GetItemOptions, GetItemResponse } from 'v1/commands/getItem'
import type { GetItemCommandClass } from 'v1/commands/getItem/command'
import { PutItemCommand, PutItemInput, PutItemOptions, PutItemResponse } from 'v1/commands/putItem'
import type { PutItemCommandClass } from 'v1/commands/putItem/command'

import { GetItemCommandMock } from './getItemCommand'
import { PutItemCommandMock } from './putItemCommand'
import { CommandMocker } from './commandMocker'
import { CommandResults } from './commandResults'
import { $entity, $mockedImplementations, $receivedCommands } from './constants'

export class MockedEntity<ENTITY extends EntityV2 = EntityV2> {
  [$entity]: ENTITY;

  [$mockedImplementations]: Partial<{
    get: (key: KeyInput<ENTITY>, options?: GetItemOptions<ENTITY>) => GetItemResponse<ENTITY>
    put: (item: PutItemInput<ENTITY>, options?: PutItemOptions<ENTITY>) => PutItemResponse<ENTITY>
  }>;
  [$receivedCommands]: {
    get: [input?: KeyInput<ENTITY>, options?: GetItemOptions<ENTITY>][]
    put: [input?: PutItemInput<ENTITY>, options?: PutItemOptions<ENTITY>][]
  }
  reset: () => void

  constructor(entity: ENTITY) {
    this[$entity] = entity

    this[$mockedImplementations] = {}
    this[$receivedCommands] = { get: [], put: [] }

    this.reset = () => {
      this[$mockedImplementations] = {}
      this[$receivedCommands] = { get: [], put: [] }
    }

    entity.build = command => {
      switch (command) {
        // @ts-expect-error impossible to fix
        case GetItemCommand:
          return new GetItemCommandMock(this)
        // @ts-expect-error impossible to fix
        case PutItemCommand:
          return new PutItemCommandMock(this)
        default:
          throw new Error(`Unable to mock entity command: ${String(command)}`)
      }
    }
  }

  on = <COMMAND_CLASS extends GetItemCommandClass | PutItemCommandClass>(
    command: COMMAND_CLASS
  ): COMMAND_CLASS extends GetItemCommandClass
    ? CommandMocker<
        'get',
        KeyInput<ENTITY>,
        GetItemOptions<ENTITY>,
        Partial<GetItemResponse<ENTITY>>
      >
    : COMMAND_CLASS extends PutItemCommandClass
    ? CommandMocker<
        'put',
        PutItemInput<ENTITY>,
        PutItemOptions<ENTITY>,
        Partial<PutItemResponse<ENTITY>>
      >
    : never => {
    switch (command) {
      case GetItemCommand:
        return new CommandMocker<
          'get',
          KeyInput<ENTITY>,
          GetItemOptions<ENTITY>,
          Partial<GetItemResponse<ENTITY>>
        >('get', this) as any
      case PutItemCommand:
        return new CommandMocker<
          'put',
          PutItemInput<ENTITY>,
          PutItemOptions<ENTITY>,
          Partial<PutItemResponse<ENTITY>>
        >('put', this) as any
      default:
        throw new Error(`Unable to mock entity command: ${String(command)}`)
    }
  }

  received = <COMMAND_CLASS extends GetItemCommandClass | PutItemCommandClass>(
    command: COMMAND_CLASS
  ): COMMAND_CLASS extends GetItemCommandClass
    ? CommandResults<'get', KeyInput<ENTITY>, GetItemOptions<ENTITY>>
    : COMMAND_CLASS extends PutItemCommandClass
    ? CommandResults<'put', PutItemInput<ENTITY>, PutItemOptions<ENTITY>>
    : never => {
    switch (command) {
      case GetItemCommand:
        return new CommandResults<'get', KeyInput<ENTITY>, GetItemOptions<ENTITY>>(
          'get',
          this
        ) as any
      case PutItemCommand:
        return new CommandResults<'put', PutItemInput<ENTITY>, PutItemOptions<ENTITY>>(
          'put',
          this
        ) as any
      default:
        throw new Error(`Unable to mock entity command: ${String(command)}`)
    }
  }
}
