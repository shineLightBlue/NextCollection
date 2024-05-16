import { getAllNotes } from '@/lib/prisma'
import SidebarNoteListFilter from './SidebarNoteListFilter'
import SidebarNoteItem from '@/components/SidebarNoteItem'
import SidebarNoteItemHeader from '@/components/SidebarNoteItemHeader'
export default async function NoteList() {
    const sleep = ms => new Promise(r=>setTimeout(r,ms))
    // await sleep(1000)
    const notes = await getAllNotes()
    // console.log(notes,'notes')
    // const obj = { foo: "bar", baz: 42 };
    // console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
    const arr = Object.entries(notes)
    // console.log(arr,'arr')
    if (arr.length == 0) {
        return <div className="notes-empty">
            {'No notes created yet!'}
        </div>
    }
    return <SidebarNoteListFilter notes={
        Object.entries(notes).map(([noteId,note])=>{
            const noteData = JSON.parse(note)
            return {
                noteId,
                note:noteData,
                header: <SidebarNoteItemHeader title={noteData.title}
                updateTime={noteData.updateTime}/>
            }
            // return <SidebarNoteItem noteId={noteId} note={JSON.parse(note)}></SidebarNoteItem>
        })
    }/>
}