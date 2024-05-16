'use client'

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export default function SidebarNoteItemContent({
    id, title, children,expandedChildren
}) {
    const router = useRouter()
    const pathname = usePathname()
    const [isExpanded, setIsExpanded] = useState(false)
    return (
        <div className={['sidebar-note-list-item', isExpanded ? 'note-expanded' : '',].join(' ')}>
            {children}
            <button className="sidebar-note-open"
                onClick={()=>{router.push(`/note/${id}`)}}
            >Open note for preview</button>
            <button className="sidebar-note-toggle-expand"
                onClick={(e)=>{
                    setIsExpanded(!isExpanded)
                }}
            >
                {isExpanded?(<img
                   src="/chevron-down.svg"
                   width="10px"
                   height="10px"
                   alt="Collapse"
                >
                </img>):(
                      <img src="/chevron-up.svg" width="10px" height="10px" alt="Expand" />
                )}
            </button>
            {isExpanded && expandedChildren}
        </div>
    )
}