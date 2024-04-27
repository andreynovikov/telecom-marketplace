export default function PageTitle(props) {
    const { title } = props

    return (
        <section className="breadcrumb-area">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="page-title">{title}</h1>
                    </div>
                </div>
            </div>
        </section>
    )
}