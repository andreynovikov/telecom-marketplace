'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { IconPalette, IconMapPins, IconTruckLoading } from '@tabler/icons-react'

export default function DashboardMenu() {
    const pathname = usePathname()

    return (
        <div className="dashboard_menu_area">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <ul className="dashboard_menu">
                            <li className={`${pathname === '/admin/contractors' ? 'active' : ''}`}>
                                <Link href="/admin/contractors">
                                    <span className="me-1">
                                        <IconTruckLoading size={24} stroke={1.5} />
                                    </span>
                                    Поставщики
                                </Link>
                            </li>
                            <li className={`${pathname === '/admin/categories' ? 'active' : ''}`}>
                                <Link href="/admin/categories">
                                    <span className="me-1">
                                        <IconPalette size={24} stroke={1.5} />
                                    </span>
                                    Услуги
                                </Link>
                            </li>
                            <li className={`${pathname === '/admin/subjects' ? 'active' : ''}`}>
                                <Link href="/admin/subjects">
                                    <span className="me-1">
                                        <IconMapPins size={24} stroke={1.5} />
                                    </span>
                                    Субъекты
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}