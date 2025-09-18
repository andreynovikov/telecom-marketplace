'use client'

import { useState } from 'react'

import Add from "@mui/icons-material/Add"
import Button from "@mui/material/Button"
import useMediaQuery from "@mui/material/useMediaQuery"

import { FlexBox } from "@/components/theme/flex-box"

import ContractorCreateDialog from './form'

export default function AddAction(props) {
    const { kind } = props

    const [contractorOpen, setContractorOpen] = useState(false)

    const downSM = useMediaQuery(theme => theme.breakpoints.down("sm"))

    return (
        <>
            <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
                <div />
                <Button onClick={() => setContractorOpen(true)} color="info" fullWidth={downSM} variant="contained" startIcon={<Add />} sx={{ minHeight: 44 }}>
                    Добавить {kind === 2 ? 'заказчика' : 'поставщика'}
                </Button>
            </FlexBox>
            <ContractorCreateDialog kind={kind} open={contractorOpen} setOpen={setContractorOpen} />
        </>
    )
}
