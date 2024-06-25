'use client'

import { useState } from 'react'

import Add from "@mui/icons-material/Add"
import Button from "@mui/material/Button"
import useMediaQuery from "@mui/material/useMediaQuery"

import { FlexBox } from "@/components/theme/flex-box"

import UserEditDialog from './form'

export default function AddAction() {
    const [userOpen, setUserOpen] = useState(false)

    const downSM = useMediaQuery(theme => theme.breakpoints.down("sm"))

    return (
        <>
            <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
                <div />
                <Button onClick={() => setUserOpen(true)} color="info" fullWidth={downSM} variant="contained" startIcon={<Add />} sx={{ minHeight: 44 }}>
                    Добавить пользователя
                </Button>
            </FlexBox>
            <UserEditDialog open={userOpen} setOpen={setUserOpen} />
        </>
    )
}