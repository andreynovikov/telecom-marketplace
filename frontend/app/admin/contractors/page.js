'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { getContractors } from '@/components/contractor/queries'

export default function ContractorList() {
    const [data, setData] = useState([])

    useEffect(() => {
        getContractors().then((result) => setData(result))
    }, [])

    const { status } = useSession()

    if (status !== "authenticated") return <div>Not authenticated</div>

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="statement_table table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Поставщик</th>
                                <th>Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((contractor) => (
                                <tr key={contractor.id}>
                                    <td>{contractor.name}</td>
                                    <td className="action">
                                        <Link href={`contractors/${contractor.id}`}>просмотр</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
