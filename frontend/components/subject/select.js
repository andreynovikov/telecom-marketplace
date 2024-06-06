import { useState, useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Grid from '@mui/material/Grid'

import { getSubjects } from './queries'

export default function SubjectSelector(props) {
    const { geography } = props
    const [subjects, setSubjects] = useState([])
    const [selected, setSelected] = useState([])

    useEffect(() => {
        getSubjects().then((result) => setSubjects(result))
    }, [])

    useEffect(() => {
        if (!!geography)
            setSelected(geography)
    }, [geography])

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
        subjects.map((subject) => (
            <Grid item md={6} xs={12}>
                <FormControlLabel control={
                    <Checkbox
                        name="geography"
                        value={subject.code}
                        checked={selected.includes(subject.code)}
                        onChange={handleChange}
                    />}
                    key={subject.code}
                    label={`${subject.code.toString().padStart(2, '0')} - ${subject.name}`} />
            </Grid>
        ))
    )
}
