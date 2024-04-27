import Link from 'next/link'

import { IconShoppingCart, IconLayoutDashboard, IconUser, IconLogin } from '@tabler/icons-react'

import { auth, signOut } from '@/lib/auth'

import UserLogoutLink from './logout-link'

export default async function UserHeaderArea() {
    const session = await auth()

    const handleLogout = async () => {
        'use server'
        await signOut({
            redirectTo: '/'
        })
    }

    const authenticated = session && session.user
    const count = 0

    return (
        <div className="author-area">
            <div className="author-area not_logged_in">
                <div className="author__notification_area">
                    <ul>
                        <li className="has_dropdown">
                            <div className="icon_wrap">
                                <IconShoppingCart size={24} stroke={1.5} />
                                { count > 0 && <span className="notification_count purch">{count}</span> }
                            </div>
                        </li>
                    </ul>
                </div>
                {authenticated ? (
                    <div className="author-author__info inline has_dropdown">
                        <div className="author__avatar">
                            <img src="/images/usr_avatar.png" alt="user avatar" />
                        </div>
                        <div className="autor__info">
                            <p className="name">
                                {session.user.email}
                            </p>
                            <p className="ammount">
                                #{session.user.id}
                            </p>
                        </div>

                        <div className="dropdowns dropdown--author">
                            <ul>
                                <li>
                                    <a href="author.html">
                                        <span>
                                            <IconUser size={20} stroke={1.5} />
                                        </span>
                                        Профиль
                                    </a>
                                </li>
                                <li>
                                    <Link href="/user/profile/contractor">
                                        <span>
                                            <IconLayoutDashboard size={20} stroke={1.5} />
                                        </span>
                                        Панель управления
                                    </Link>
                                </li>
                                <li>
                                    <UserLogoutLink logout={handleLogout} />
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="pull-right join desktop-size d-md-block d-none">
                            <Link href="/auth/register" className="btn btn--round btn-secondary btn--xs">
                                Стать поставщиком
                            </Link>
                            <Link href="/auth/login" className="btn btn--round btn--xs">
                                Войти
                            </Link>
                        </div>
                        <div className="pull-right join mobile-size d-md-none d-flex">
                            <Link href="/auth/register" className="btn btn--round btn-secondary">
                                <IconUser size={24} stroke={1.5} />
                            </Link>
                            <Link href="/auth/login" className="btn btn--round">
                                <IconLogin size={24} stroke={1.5} />
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}