import { getService } from './queries'

export default async function Service(props) {
    const {id} = props
    const service = await getService(id)
    return service.name
}
