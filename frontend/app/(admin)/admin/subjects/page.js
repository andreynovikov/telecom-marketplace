import { auth } from '@/lib/auth'

import { getSubjects } from '@/components/subject/queries'

export default async function SubjectList() {
    const subjects = await getSubjects()
    const session = await auth()
    if (session?.user?.role !== "admin") return <div>Not authenticated</div>

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="statement_table table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                            <th>Код</th>
                                <th>Субъект</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((subject) => (
                                <tr key={subject.code}>
                                    <td>{subject.code.toString().padStart(2, '0')}</td>
                                    <td>{subject.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
