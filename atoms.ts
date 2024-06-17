import {PrismaClient, Assistant, UserThread} from '@prisma/client'
import {atom} from 'jotai'

// Initialize Prisma Client
const prisma = new PrismaClient()

export const userThreadAtom = atom<UserThread | null>(null)
export const assistantAtom = atom<Assistant | null>(null)
