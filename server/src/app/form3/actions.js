'use server'
import {revalidatePath} from 'next/cache'
const sleep = ms=>new Promise(r=>setTimeout(r,ms))
let data = ['阅读','写作','冥想']
export async function findToDos(){
    return data
}
export async function createToDo(prevState,formData){
    console.log(prevState,'prevState')
    await sleep(500)
    const todo = formData.get('todo')
    data.push(todo)
    revalidatePath("/form3")
    return {
        message: `add ${todo} success!`
    }
}