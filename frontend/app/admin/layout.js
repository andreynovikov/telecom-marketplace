import DashboardMenu from '@/components/admin/dashboard-menu';
import PageTitle from '@/components/ui/page-title';

export default function DashboardLayout({ children }) {
    return (
        <>
            <PageTitle title="Панель администрирования" />
            <section className="dashboard-area">
                <DashboardMenu />
                <div className="dashboard_contents">
                    <div className="container">
                        {children}
                    </div>
                </div>
            </section>
        </>
    )
}
