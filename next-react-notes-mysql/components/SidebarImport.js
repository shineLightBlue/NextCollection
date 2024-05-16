'use client'
import React, { Suspense } from "react"
import { useRouter } from 'next/navigation'
import { useFormStatus } from 'react-dom'
import { importNote } from "@/actions"
function Submit() {
    const { pending } = useFormStatus()
    return <button disabled={pending}>{pending ? 'Submitting' : 'Submit'}</button>
}
export default function SidebarImport() {
    const router = useRouter()
    async function upload(formData) {
        console.log(formData,'formData')
        // console.log(e)
        // const formData = new FormData()
        const file = formData.get("file")
        // const response = await fetch("/api/upload", {
        //     method: "POST",
        //     body: formData
        // })
        // const data = await response.json()
        const data = await importNote(formData)
        console.log(data)
        router.push(`/note/${data.uid}`)
    }
    const onChange = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData();
        formData.append("file", file);
        // const data = await importNote(formData)
        // router.push(`/note/${data.uid}`)
    }
    return (
        // <div style={{ textAlign: "center" }}>
        //     <label style={{ cursor: 'pointer' }} htmlFor="file">Import .md File</label>
        //     <input type="file" id="file" style={{ display: 'none' }}
        //         accept=".md" onChange={onChange} />
        //     {/* <div><Submit /></div> */}
        // </div>
        <form style={{ textAlign: "center" }} action={upload}>
            <label style={{ cursor: 'pointer' }} htmlFor="file">Import .md File</label>
            <input type="file" id="file" name="file"
                accept=".md" />
            <div><Submit /></div>
        </form>
    )
}