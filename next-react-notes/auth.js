import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { addUser, getUser } from "@/lib/prisma";
// export const { handlers, auth, signIn, signOut } = NextAuth({
//     providers: [GitHub],
//     callbacks: {
//         authorized({ request, auth }) {
//             const { pathname } = request.nextUrl
//             if (pathname.startsWith("/note/edit")) {
//                 console.log(auth, 'auth')
//                 return !!auth
//             } else {
//                 return true
//             }
//         }
//     }
// })
export const { handlers, auth, signIn, signOut } = NextAuth({
    providers:
        [CredentialsProvider({
            name: "密码登录",
            credentials: {
                username: { label: "邮箱", type: "text", placeholder: "输入您的邮箱" },
                password: { label: "密码", type: "password", placeholder: "输入您的密码" }
            },
            async authorize(credentials, req) {
                console.log(credentials, 'credentials')
                // 默认情况下不对用户输入进行验证，确保使用 Zod 这样的库进行验证
                let user = null

                // 登陆信息验证
                user = await getUser(credentials.username, credentials.password)
                console.log(user, 'user1')

                // 密码错误
                if (user === 1) return null

                // 用户注册
                if (user === 0) {
                    user = await addUser(credentials.username, credentials.password)
                    console.log(user, 'user2')
                }

                if (!user) {
                    throw new Error("User was not found and could not be created.")
                }

                return user
            }
        }), GitHub],
    pages: {
        signIn: '/auth/signin'
    },
    callbacks: {
        authorized({ request, auth }) {
            console.log('authorized')
            const { pathname } = request.nextUrl
            if (pathname.startsWith("/note/edit")) {
                console.log(auth, 'auth')
                return !!auth
            } else {
                return true
            }
        },
        async jwt({ token, user, account }) {
            console.log('jwtjwtjwtjwtjwtjwt')
            if (account && account.type === "credentials" && user) {
                token.userId = user.userId
            }
            return token
        },
        async session({ session, token }) {
            console.log('sessionsessionsessionsession')
            session.user.userId = token.userId
            return session
        }
    }
})