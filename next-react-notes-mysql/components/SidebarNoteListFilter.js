'use client'
import { useSearchParams } from 'next/navigation'
import { Children } from 'react'
import SidebarNoteItemContent from '@/components/SidebarNoteItemContent'
export default function SidebarNoteListFilter({ notes }) {
    const searchParams = useSearchParams()
    const searchText = searchParams.get('q')
    return (<ul className="notes-list">
        {notes.map(noteItem=>{
            const {noteId,note,header}= noteItem;
            if (!searchText || note.title.toLowerCase().includes(searchText.toLowerCase())) {
                return (
                    <SidebarNoteItemContent
                    key={noteId}
                    id={noteId}
                    title={note.title}
                    expandedChildren={
                        <p className="sidebar-note-excerpt">
                            {note.content.substring(0,20)||<i>(No content)</i>}
                        </p>
                    }
                    >{header}</SidebarNoteItemContent>
                )
            }
        })}
    </ul>)
}
 /* {Children.map(children,(child,index)=>{
            const title = child.props.title
            if (!searchText || title.toLowerCase().includes(searchText.toLowerCase())) {
                return <li key={index}>{child}</li>
            }
        })} */
        // {Object.entries(notes).map(([noteId, note]) => {
        //     const noteData = JSON.parse(note)
        //     // console.log(noteData.title.toLowerCase(),'title')
        //     // const { title, updateTime } = JSON.parse(note);
        //     if (!searchText || noteData.title.toLowerCase().includes(searchText.toLowerCase())) {
        //         return <li key={noteId}>
        //             {/* <header className="sidebar-note-header">
        //         <strong>{title}</strong>
        //         <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
        //     </header> */}
        //             <SidebarNoteItem noteId={noteId} note={JSON.parse(note)}></SidebarNoteItem>
        //         </li>
        //     }
        // })}