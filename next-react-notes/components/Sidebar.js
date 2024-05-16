import React, { Suspense } from "react";
import Link from "next/link";
// import { getAllNotes } from "@/lib/redis";
import SidebarNoteList from '@/components/SidebarNoteList'
import EditButton from "@/components/EditButton";
import NoteListSkeleton from "./NoteListSkeleton";
import SidebarSearchField from "@/components/SidebarSearchField";
import SidebarImport from "@/components/SidebarImport";
export default async function Sidebar() {
    // const notes = await getAllNotes()
    return (
        <>
            <section className="col sidebar">
                <Link href={'/'} className="link--unstyled">
                    <section className="sidebar-header">
                        <img className="logo" src="/logo.svg" width="22px" height="20px" alt="" />
                        <strong>React Notes</strong>
                    </section>
                </Link>
                <section className="sidebar-menu" >
                    <SidebarSearchField/>
                    <EditButton noteId={null}>New</EditButton>
                </section>
                <nav>
                    <Suspense fallback={<NoteListSkeleton/>}>
                    <SidebarNoteList/>
                    </Suspense>
                </nav>
                <SidebarImport/>
            </section>
        </>
    )
}