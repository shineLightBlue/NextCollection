import { NextResponse } from "next/server"
import dayjs from "dayjs"
import { join } from 'path'
import { stat, mkdir, writeFile } from 'fs/promises'
import mime from 'mime'
import { addNote } from "@/lib/redis"
export async function POST(request) {
    const formData = await request.formData()
    console.log(formData, 'formData')
    const file = formData.get('file')
    console.log(file, 'file')
    console.log(mime.getExtension(file.type), 'mime.getExtension(file.type)')
    if (!file) {
        return NextResponse.json({
            error: "File is required."
        }, {
            status: 400
        })
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeUploadDir = `/uploads/${dayjs().format("YY-MM-DD")}`;
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);
    try {
        const res = await stat(uploadDir)
        console.log(res, 'res')
    } catch (error) {
        console.log(error)
        if (error.code === 'ENOENT') {
            await mkdir(uploadDir, { recursive: true })
        } else {
            return NextResponse.json({
                error: "Something went wrong."
            }, { status: 500 })
        }
    }
    try {
        const uniqueSuffix = `${Math.random().toString(36).slice(-6)}`;
        const filename = file.name.replace(/\.[^/.]+$/, "")
        const uniqueFilename = `${filename}-${uniqueSuffix}.md`;
        await writeFile(`${uploadDir}/${uniqueFilename}`, buffer);
        const res = await addNote(JSON.stringify({
            title: filename,
            content: buffer.toString('utf-8')
        }))
        return NextResponse.json({ fileUrl: `${relativeUploadDir}/${uniqueFilename}`, uid: res });
    } catch (error) {
        return NextResponse.json({
            error: "Something went wrong"
        }, { status: 500 })
    }

}
