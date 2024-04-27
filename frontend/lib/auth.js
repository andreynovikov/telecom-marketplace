import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                let user = null

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials)
                });

                const result = await response.json();

                if (response.ok)
                    user = result

                if (!user)
                    throw new Error(result.msg)

                // return user object with their profile data
                return user
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.data = user
            }
            return token
        },
        session({ session, token }) {
            //console.log(token)
            //console.log(session)
            session.user = { ...session.user, ...token.data }
            return session
        },
    },
    events: {
        async signOut({ session }) {
            await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session?.access_token}`
                }
            })
        },
    },
})

const signUp = async (formData) => {
    const values = Object.fromEntries(formData.entries())

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        });

        const result = await response.json();
        if (response.ok) {
            return signIn('credentials', formData)
        } else {
            return {
                error: true,
                message: result.msg
            }
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

export { handlers, signUp, signIn, signOut, auth }