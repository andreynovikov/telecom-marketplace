import Link from 'next/link'

import { signIn } from '@/lib/auth'

import PageTitle from '@/components/ui/page-title'

export default function Login() {
    const loginAction = async (formData) => {
        'use server'
        formData.append('redirectTo', '/user/profile/contractor')
        await signIn('credentials', formData)
    }

    const error = undefined

    return (
        <>
            <PageTitle title="Вход" />
            <section className="signup_area section--padding2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <form action={loginAction}>
                                <div className="cardify login">
                                    <div>{error && <p>{error}</p>}</div>
                                    <div className="login--header">
                                        <h3>Добро пожаловать</h3>
                                    </div>
                                    <div className="login--form">
                                        <div className="form-group">
                                            <label htmlFor="inputEmail">Адрес электронной почты</label>
                                            <input type="text" className="text_field" id="inputEmail" name="email" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="inputPassword">Пароль</label>
                                            <input type="password" className="text_field" id="inputPassword" name="password" />
                                        </div>
                                        <button type="submit" className="btn btn--md btn--round login_btn">Войти</button>
                                        <div className="login_assist">
                                            <p>
                                                Ещё не{" "}
                                                <Link href="/auth/register">зарегистрированы</Link>?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
