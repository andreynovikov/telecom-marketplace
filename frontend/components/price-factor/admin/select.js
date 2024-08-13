import { useState, useEffect } from 'react'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { getPriceFactors } from '../queries'

export default function PriceFactorSelect(props) {
    const { defaultValue, name, required } = props

    const [priceFactors, setPriceFactors] = useState([])

    useEffect(() => {
        getPriceFactors().then((result) => setPriceFactors(result))
    }, [])

    return (
        <FormControl fullWidth margin="dense" required={required}>
            <InputLabel id="price-factor-select-label">Категория цен</InputLabel>
            <Select
                labelId="price-factor-select-label"
                name={name}
                defaultValue={defaultValue || ''}
                label="Категория цен"
            >
                {priceFactors.map((factor) => (
                    <MenuItem key={factor.id} value={factor.id}>{factor.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}