import { PrismaClient } from "@prisma/client";
import { auth } from "../auth"
export const prisma = new PrismaClient()
export async function getAllNotes() {
    const session = await auth()
    if (session == null) return []
    const notes = await prisma.note.findMany({
        where: {
            authorId: session?.user?.userId
        }
    })
    const res = {}
    notes.forEach(({ title, content, id, updatedAt }) => {
        res[id] = JSON.stringify({
            title,
            content,
            updateTime: updatedAt
        })
    })
    return res
}
export async function addNote(data) {
    console.log(data, 'addNote')
    const session = await auth()
    console.log(session, 'session3')
    const result = await prisma.note.create({
        data: {
            title: JSON.parse(data).title,
            content: JSON.parse(data).content,
            author: { connect: { id: session?.user?.userId } }
        }
    })
    return result.id
}
export async function getNote(uuid) {
    const session = await auth()
    if (session == null) return
    const { title, content, updateTime, id } = await prisma.note.findFirst({
        where: {
            id: uuid
        }
    })
    return {
        title,
        content,
        updateTime,
        id
    }
}
export async function delNote(uuid) {
    await prisma.note.delete({
        where: {
            id: uuid
        }
    })
}
export async function updateNote(uuid, data) {
    const parsedData = JSON.parse(data)
    await prisma.note.update({
        where: {
            id: uuid
        },
        data: {
            title: parsedData.title,
            content: parsedData.content
        }
    })
}
export async function addUser(username, password) {
    const user = await prisma.user.create({
        data: {
            username,
            password,
            notes: {
                create: []
            }
        }
    })
    console.log(user, 'user3')
    return {
        name: username,
        username,
        userId: user.id
    }
}
export async function getUser(username, password) {
    const user = await prisma.user.findFirst({
        where: {
            username
        },
        include: {
            notes: true
        }
    })
    console.log(user, 'user4')
    if (!user) return 0
    if (user.password !== password) return 1
    return {
        name: username,
        username,
        userId: user.id
    }
}

export default prisma