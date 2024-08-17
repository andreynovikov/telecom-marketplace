'use client'

import { useState, useEffect } from 'react'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { getBrands } from '../queries'

export default function BrandSelect(props) {
    const { defaultValue, name, required } = props

    const [brands, setBrands] = useState([])

    useEffect(() => {
        getBrands().then((result) => setBrands(result))
    }, [])

    return (
        <FormControl fullWidth margin="dense" required={required}>
            <InputLabel id="brand-select-label">Бренд</InputLabel>
            <Select
                labelId="brand-select-label"
                name={name}
                defaultValue={defaultValue || ''}
                label="Бренд"
            >
                {brands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>{brand.name}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}