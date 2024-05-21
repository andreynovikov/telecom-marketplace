'use server'

import { redirect } from 'next/navigation'

import { auth, signUp, signIn } from '@/lib/auth'

export async function register(_currentState, formData) {
    formData.append('redirectTo', '/user/profile/contractor')
    return await signUp(formData)
}

export async function login(_currentState, formData) {
    const values = Object.fromEntries(formData.entries())
    try {
        await signIn('credentials', {...values, redirect: false})
    } catch (error) {
        return {
            error: true,
            message: error.cause ? error.cause.err.message : error.message
        }
    }
    const session = await auth()
    console.log(session)
    redirect('/user/profile')
}