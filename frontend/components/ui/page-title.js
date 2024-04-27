export default function PageTitle(props) {
    const { title } = props

    return (
        <section class="breadcrumb-area">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h1 class="page-title">{title}</h1>
                    </div>
                </div>
            </div>
        </section>
    )
}