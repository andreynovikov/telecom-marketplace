import { getService } from './queries'

export default async function Service(props) {
    const {id} = props

    const service = await getService(id)

    console.log(service)
    return service.name
}
