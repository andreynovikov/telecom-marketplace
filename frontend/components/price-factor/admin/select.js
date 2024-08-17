'use client'

import { useState, useEffect } from 'react'

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
            <Select
                name={name}
                defaultValue={defaultValue || ''}
            >
                {priceFactors.map((factor) => (
                    <MenuItem key={factor.id} value={factor.id}>{factor.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}