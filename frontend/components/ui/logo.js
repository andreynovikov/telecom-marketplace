import Link from 'next/link'

export default function Logo() {
    return (
        <div className="logo">
            <Link href="/">
                <img src="/images/SI Main Logo Transparent.svg" alt="SI Telecom Logo" className="img-fluid" style={{ maxHeight: 50 }} />
            </Link>
        </div>
    )
}