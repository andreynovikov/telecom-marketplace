'use client'

import Button from "@mui/material/Button"
import useMediaQuery from "@mui/material/useMediaQuery"

import { FlexBox } from "@/components/theme/flex-box"

import { updateContractor } from '../queries'

export default function Actions(props) {
    const { contractor } = props
    const downSM = useMediaQuery(theme => theme.breakpoints.down("sm"))

    const buttonProps = {
        fullWidth: downSM,
        variant: "contained",
        sx: { minHeight: 44 }
    }

    async function setContractorStatus(status) {
        return updateContractor(contractor.id, { status })
    }

    return (
        <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
            <div />
            <FlexBox gap={2} justifyContent="space-between" flexWrap="wrap">
                {contractor.status !== 2 && (
                    <Button onClick={async () => await setContractorStatus(2)} color="primary" {...buttonProps}>
                        {contractor.status < 2 ? 'Начать' : 'Вернуть на'} рассмотрение
                    </Button>
                )}
                {contractor.status !== 16 && (
                    <Button onClick={async () => await setContractorStatus(16)} color="success" {...buttonProps}>
                        Подтвердить
                    </Button>
                )}
                {contractor.status !== 64 && (
                    <Button onClick={async () => await setContractorStatus(64)} color="error" {...buttonProps}>
                        Отклонить
                    </Button>
                )}
            </FlexBox>
        </FlexBox>
    )
}