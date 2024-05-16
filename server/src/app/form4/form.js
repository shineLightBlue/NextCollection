'use client'
import { useOptimistic } from 'react'
import { useFormState } from 'react-dom'
import { createToDo } from './actions'
export default function Form({ todos }) {
    const [state, sendFormAction] = useFormState(createToDo, { message: '' })
    const [optimistiToDos, addOptimisticTodo] = useOptimistic(
        todos.map((i) => ({ text: i })),
        (state, newTodo) => {
            return [
                ...state,
                {
                    text: newTodo,
                    sending: true
                }
            ]
        }
    )
    console.log(optimistiToDos, 'optimistiToDos')
    async function formAction(formData) {
        addOptimisticTodo(formData.get("todo"))
        // console.log(sendFormAction(formData),'sendFormAction')
        sendFormAction(formData)
    }
    return (
        <>
            <form action={formAction}>
                <input type="text" name="todo" />
                <button type='submit'>Add</button>
                <p>{state?.message}</p>
            </form>
            <ul>
                {optimistiToDos.map(({ text, sending }, i) => {
                    // console.log(text,sending,i)
                    return <li key={i}>{text}{sending && <small>(Sending...)</small>}</li>
                })}
            </ul>
        </>
    )
}
