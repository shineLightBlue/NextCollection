import { NextResponse } from "next/server";
export async function GET(request,{params}){
    const field = request.nextUrl.searchParams.get("dataField")
    console.log(field,'field')
    const data = await ((await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)).json())
    console.log(data,'data')
    const result = field ? { [field]: data[field] } : data
    return NextResponse.json(result)
}