// async function getData(){
//   const res = await fetch('https://jsonplaceholder.typicode.com/todos')
//   if(!res.ok){
//     throw new Error('Failed to fetch data')
//   }
//   return res.json()
// }
// export default async function page(){
//   const data = await getData()
//   return <main>{JSON.stringify(data)}</main>
// }
async function getData() {
  const res = await fetch('https://api.thecatapi.com/v1/images/search')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
export default async function Page() {
  const data = await getData()
  return <>
    <img src={data[0].url} width="300"></img>
    <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>
  </>
}