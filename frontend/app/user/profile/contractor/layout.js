export default function DashboardLayout({ children }) {
    return (
        <section className="dashboard-area">
            <div className="dashboard_contents">
                <div className="container">
                    {children}
                </div>
            </div>
        </section>
    )
}
