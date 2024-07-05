import { useState, useEffect, Fragment } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

import { Paragraph } from "@/components/theme/Typography"

import { getCategories } from '../category/queries'
import { getServices } from './queries'

export default function ServiceSelector(props) {
    const { catalogue } = props
    const [categories, setCategories] = useState([])
    const [services, setServices] = useState({})
    const [selected, setSelected] = useState([])

    useEffect(() => {
        getCategories().then((result) => {
            setCategories(result)
            const serviceCalls = result.map((category) => getServices(category.id))
            Promise.all(serviceCalls).then((result) => {
                const services = result.reduce((services, list) => {
                    list.map((service) => {
                        if (!(service.category in services))
                            services[service.category] = []
                        services[service.category].push(service)
                    })
                    return services
                }, {})
                setServices(services)
            })
        })
    }, [])

    useEffect(() => {
        if (!!catalogue)
            setSelected(catalogue.reduce((ids, service) => {
                ids.push(service.id)
                return ids
            }, []))
    }, [catalogue])

    const handleChange = (event) => {
        const value = + event.target.value
        setSelected(selected => {
            if (event.target.checked)
                return [...selected, value]
            else
                return selected.filter(v => v !== value)
        })
    }

    return (
        categories.map((category) => (
            <Fragment key={category.id}>
                <Paragraph fontWeight={700} mb={1}>
                    {category.name}
                </Paragraph>
                <FormGroup sx={{ mb: 2 }}>
                    {services[category.id]?.map((service) => (
                        <FormControlLabel control={
                            <Checkbox
                                name="catalogue"
                                value={service.id}
                                checked={selected.includes(service.id)}
                                onChange={handleChange}
                            />}
                            key={service.id}
                            label={service.name} />
                    ))}
                </FormGroup>
            </Fragment>
        ))
    )
}
