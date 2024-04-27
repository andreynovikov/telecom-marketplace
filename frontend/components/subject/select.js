import { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'

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
        <div className="mt-3 ps-1" style={{ maxHeight: '18rem', overflowY: 'scroll' }}>
            {subjects.map((subject) => (
                <Form.Check
                    type="checkbox"
                    key={subject.code}
                    name="geography"
                    value={subject.code}
                    checked={selected.includes(subject.code)}
                    onChange={handleChange}
                    label={`${subject.code.toString().padStart(2, '0')} - ${subject.name}`} />
            ))}
        </div>
    )
}
