'use client'

import { useFormState } from 'react-dom'

import Link from 'next/link'

import Alert from 'react-bootstrap/Alert'

import { register } from '@/lib/actions'

import PageTitle from '@/components/ui/page-title'

export default function SignUp() {
    const [result, dispatch] = useFormState(register, undefined)

    return (
        <>
            <PageTitle title="Регистрация" />
            <section className="signup_area section--padding2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <form action={dispatch}>
                                <div className="cardify signup_form">
                                    <div className="login--header">
                                        <h3>Зарегистрируйтесь</h3>
                                        <p>
                                            Заполните все поля, чтобы создать новую учётную запись.
                                        </p>
                                    </div>
                                    <div className="login--form">

                                        <div className="form-group">
                                            <label htmlFor="email_ad">E-mail адрес</label>
                                            <input id="email_ad" name="email" type="email" className="text_field" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">Пароль</label>
                                            <input id="password" name="password" type="password" className="text_field" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="con_pass">Подтвердите пароль</label>
                                            <input id="con_pass" name="confirm" type="password" className="text_field" />
                                        </div>

                                        <button className="btn btn--md btn--round register_btn" type="submit">Зарегистрироваться</button>

                                        <div className="login_assist">
                                            {result?.error && (
                                                <Alert variant="danger">
                                                    {result.message}
                                                </Alert>
                                            )}
                                            <p>
                                                Уже зарегистрированы?{" "}
                                                <Link href="/auth/login">Войдите</Link>
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
