import Subject from '@/components/subject'

import { getContractor } from '@/components/contractor/queries'

export default async function Contractor({ params }) {
    const contractor = await getContractor(params.id)

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="dashboard_title_area">
                        <div className="dashboard__title">
                            <h3>{contractor.name}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="dashboard_module">
                        <div className="dashboard__content">
                            <div className="table-responsive">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>ИНН</td>
                                            <td className="bold">{contractor.inn}</td>
                                        </tr>
                                        <tr>
                                            <td>Юридический адрес</td>
                                            <td className="bold">{contractor.legal_address}</td>
                                        </tr>
                                        <tr>
                                            <td>Информация о компании</td>
                                            <td className="bold">{contractor.cover_letter}</td>
                                        </tr>
                                        <tr>
                                            <td>Опыт работы</td>
                                            <td className="bold">{contractor.experience}</td>
                                        </tr>
                                        <tr>
                                            <td>География услуг</td>
                                            <td className="bold">
                                                {contractor.geography.map((code) => (
                                                    <div key={code}>
                                                        <Subject code={code} />
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <pre>
                                {JSON.stringify(contractor, undefined, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
