'use server'
import { redirect } from "next/navigation"
import { addNote, updateNote, delNote } from "@/lib/prisma"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { stat, mkdir, writeFile } from 'fs/promises'
import { join } from "path";
import mime from "mime";
import dayjs from 'dayjs';
const schema = z.object({
    title: z.string(),
    content: z.string().min(1, '请填写内容').max(100, '字数最多100')
})
export async function saveNote(prevState, formData) {
    const sleep = ms => new Promise(r => setTimeout(r, ms))
    const noteId = formData.get('noteId')
    const data = {
        title: formData.get('title'),
        content: formData.get('body'),
        updateTime: new Date()
    }
    console.log(data, 'data11')
    const validated = schema.safeParse(data)
    console.log(validated, 'validated')
    if (!validated.success) {
        return {
            errors: validated.error.issues
        }
    }
    console.log(data, 'data')
    if (noteId) {
        updateNote(noteId, JSON.stringify(data))
        revalidatePath('/', 'layout')
        redirect(`/note/${noteId}`)
    } else {
        const res = await addNote(JSON.stringify(data))
        revalidatePath('/', 'layout')
        redirect(`/note/${res}`)
    }
}
export async function deleteNote(prevState, formData) {
    const noteId = formData.get('noteId')
    delNote(noteId)
    revalidatePath('/', 'layout')
    redirect('/')
}
export async function importNote(formData) {
    const file = formData.get('file')
    console.log(file,'newfile')
    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeUploadDir = `/uploads/${dayjs().format("YY-MM-DD")}`;
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);
    try {
        await stat(uploadDir);
    } catch (e) {
        if (e.code === "ENOENT") {
            await mkdir(uploadDir, { recursive: true });
        } else {
            console.error(e)
            return { error: "Something went wrong." }
        }
    }
    
  try {
    // 写入文件
    const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
    const filename = file.name.replace(/\.[^/.]+$/, "")
    const uniqueFilename = `${filename}-${uniqueSuffix}.md`;
    await writeFile(`${uploadDir}/${uniqueFilename}`, buffer);

    // 调用接口，写入数据库
    const res = await addNote(JSON.stringify({
      title: filename,
      content: buffer.toString('utf-8')
    }))

    // 清除缓存
    revalidatePath('/', 'layout')
    return { fileUrl: `${relativeUploadDir}/${uniqueFilename}`, uid: res }
  } catch (e) {
    console.error(e)
    return { error: "Something went wrong." }
  }
}