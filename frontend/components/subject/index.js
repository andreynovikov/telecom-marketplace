import { getSubject } from './queries'

export default async function Subject(props) {
    const {code} = props

    const subject = await getSubject(code)

    console.log(subject)
    return subject.name
}
