import { nanoid } from 'nanoid'
import { Server } from 'socket.io'
import { ExtendedError } from 'socket.io/dist/namespace'
import { Socket } from 'socket.io/dist/socket'

export const findEntity = <T extends { id: string }>(
    entities: T[],
    _entity: Partial<T>
): { index: number; entity: T } | undefined => {
    const index = entities.findIndex((entity) => _entity.id && _entity.id === entity.id)
    if (index > -1) {
        return {
            index,
            entity: entities[index]
        }
    }
    return undefined
}

export const upsertEntity = <T extends { id: string }>(entities: T[], _entity: Partial<T>): T => {
    const entityMeta = findEntity(entities, _entity)
    if (entityMeta) {
        const existing = {
            ...entityMeta.entity,
            ..._entity
        }
        entities[entityMeta.index] = existing
        return existing
    }
    const newEntity = {
        ..._entity,
        id: nanoid()
    } as T
    entities.push(newEntity)
    return newEntity
}

export const expressToSocketMiddleware = (middleware: any) => (
    socket: Socket,
    next: (err?: ExtendedError) => void
): Server => middleware(socket.request, {}, next)
