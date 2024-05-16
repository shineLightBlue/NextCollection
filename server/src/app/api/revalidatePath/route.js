import { revalidatePath } from "next/cache";
export async function GET(request) {
    const path = request.nextUrl.searchParams.get('path')
    console.log(path, 'path')
    if (path) {
        revalidatePath(path)
        return Response.json({ revalidated: true, now: Date.now() })
    }
    return Response.json({
        revalidated: false,
        now: Date.now(),
        message: 'Missing path to revalidate'
    })
}