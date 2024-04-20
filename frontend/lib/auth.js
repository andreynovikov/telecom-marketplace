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

                if (response.ok) {
                    user = result
                }

                if (!user) {
                    // No user found, so this is their first attempt to login
                    // meaning this is also the place you could do registration
                    throw new Error(result)
                }

                // return user object with the their profile data
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
            console.log(token)
            console.log(session)
            session.user = { ...session.user, ...token.data }
            return session
        },
    },
    events: {
        async signOut() {
            console.log('signout')
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
            console.error(result.msg)
            throw new Error({error})
        }
    } catch (error) {
        console.error("Error: " + error)
        throw new Error({error})
    }
}

export { handlers, signUp, signIn, signOut, auth }