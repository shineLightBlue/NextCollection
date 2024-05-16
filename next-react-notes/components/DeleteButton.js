import { useFormStatus } from 'react-dom'
export default function EditButton({ isDraft, formAction }) {
    const { pending } = useFormStatus()
    console.log(123)
    return !isDraft && (
        <button
            className="note-editor-delete"
            disabled={pending}
            formAction={formAction}
        >
            <img
                src="/cross.svg"
                width="10px"
                height="10px"
                alt=""
                role="presentation"
            />
            Delete
        </button>
    )
}