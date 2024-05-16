// import { NextResponse } from "next/server";
// export function middleware(request){
//     return NextResponse.redirect(new URL('/home',request.url))
// }
// export const config = {
//     matcher: '/about/:path*'
// }
// export function middleware(request){
//     if(request.nextUrl.pathname.startWith('/about')){
//         return NextResponse.rewrite(new URL('/about-2',request.url))
//     }
//     if(request.nextUrl.pathname.startWith('/dashboard')){
//         return NextResponse.rewrite(new URL('/dashboard/user',request.url))
//     }
// }
// export function middleware(request){
//     // let cookie = request.cookies.get('nextjs')
//     // console.log(cookie,'cookie')
//     // const allCookies = request.cookies.getAll()
//     // console.log(allCookies,'allCookies')
//     const response = NextResponse.next()
//     response.cookies.set('vercel','fast')
//     response.cookies.set({
//         name:'vercel',
//         value:'fast',
//         path:'/'
//     })
//     let cookie = response.cookies.get('vercel')
//     console.log(cookie,'cookie')
// }
import { NextResponse } from 'next/server'
import { RateLimiter } from "limiter";
const limiter = new RateLimiter({ tokensPerInterval: 3, interval: "min", fireImmediately: true })
export async function middleware(request) {
    const remainingRequests = await limiter.removeTokens(1);
    if (remainingRequests < 0) {
        return new NextResponse(
            JSON.stringify({ success: false, message: 'Too Many Requests' }),
            { status: 429, headers: { 'content-type': 'application/json' } }
        )
    }
    return NextResponse.next()
}
export const config = {
    matcher:'/api/chat'
}