import { signIn, signOut } from "@/auth"
import { auth } from "@/auth"
import Link from 'next/link'
function SignIn({ provider }) {
    return (
        <form action={
            async () => {
                "use server"
                const res = await signIn(provider)
                console.log(res, 'signIn')
            }
        }>
            <button>Sign In</button>
        </form>
    )
}
function SignOut() {
    return (
        <form action={
            async () => {
                "use server"
                const res = await signOut()
                console.log(res, 'signOut')
            }
        }>
            <button>Sign Out</button>
        </form>
    )
}
export default async function Header() {
    const session = await auth()
    console.log(session, 'session1')
    return (
        <header style={{ display: "flex", "justifyContent": "space-around" }}>
            <Link href="/client">Client Side Component</Link>
            {session?.user ? <span style={{ display: "flex", "alignItems": "center" }}>
                {session?.user.name}<SignOut />
            </span> : <SignIn />}
        </header>
    )
}