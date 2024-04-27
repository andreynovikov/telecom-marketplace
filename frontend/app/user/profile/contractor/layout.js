import PageTitle from '@/components/ui/page-title';

export default function DashboardLayout({ children }) {
    return (
        <>
            <PageTitle title="Панель управления" />
            <section className="dashboard-area">
                <div className="dashboard_contents">
                    <div className="container">
                        {children}
                    </div>
                </div>
            </section>
        </>
    )
}
