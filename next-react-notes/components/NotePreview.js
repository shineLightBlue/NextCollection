export default function NotePreview({children}){
    return (
        <div className="note-preview">
            <div className="text-with-markdown">
                {children}
            </div>
        </div>
    )
}