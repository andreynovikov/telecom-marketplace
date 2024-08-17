'use client'

import Card from '@mui/material/Card'
import useMediaQuery from '@mui/material/useMediaQuery'

import FlexBox from '@/components/theme/flex-box/flex-box'
import { Small, Span } from '@/components/theme/Typography'

export default function UserInfo({ user }) {
    const downMd = useMediaQuery(theme => theme.breakpoints.down("sm"))

    return <Card sx={{
        my: 3,
        display: "flex",
        flexWrap: "wrap",
        p: "0.75rem 1.5rem",
        alignItems: "center",
        justifyContent: "space-between",
        ...(downMd && {
            alignItems: "start",
            flexDirection: "column",
            justifyContent: "flex-start"
        })
    }}>
        <TableRowItem title="ФИО" value={user.name} />
        <TableRowItem title="Электронная почта" value={user.email} />
        <TableRowItem title="Контактный телефон" value={user.phone} />
    </Card>
}

function TableRowItem({ title, value }) {
    return <FlexBox flexDirection="column" p={1}>
        <Small color="grey.600" mb={0.5}>
            {title}
        </Small>
        <Span>{value || '-'}</Span>
    </FlexBox>
}