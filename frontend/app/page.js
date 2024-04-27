import CategoryList from '@/components/category/list'

export default function Index() {
    return (
        <section className="products section--padding">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <CategoryList />
                    </div>
                </div>
            </div>
        </section>
    )
}
