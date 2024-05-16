export default async function Page(){
    const res = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await res.json()
    console.log(data)
}