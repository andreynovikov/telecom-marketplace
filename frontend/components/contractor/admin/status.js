'use client'

import { makeSvgIcon } from '@/theme/icons'

import { IconClipboardPlus, IconClipboardTypography, IconClipboardData, IconClipboardCheck, IconClipboardX } from '@tabler/icons-react'

const providerStatuses = {
    0: 'новая',
    1: 'обновлённая',
    2: 'на рассмотрении',
    16: 'подтверждённая',
    64: 'отклонённая'
}

const consumerStatuses = {
    0: 'новый',
    1: 'обновлён',
    2: 'на рассмотрении',
    16: 'подтверждён',
    64: 'отклонён'
}

const statusIcons = {
    0: IconClipboardPlus,
    1: IconClipboardTypography,
    2: IconClipboardData,
    16: IconClipboardCheck,
    64: IconClipboardX
}

const statusColors = {
    0: 'warning',
    1: 'warning',
    2: 'primary',
    16: 'success',
    64: 'error'
}

const Switch = ({ test, children }) => {
    return children.find(child => {
        return child.props.value === test
    })
}

const iconProps = {
    fontSize: "small",
    sx: {mr: 0.5, verticalAlign: "top"}
}

const makeIcon = (status, hideText, props) => {
    if (hideText)
        return makeSvgIcon(statusIcons[status], { value: status, color: statusColors[status], ...props })
    else
        return makeSvgIcon(statusIcons[status], { value: status, color: statusColors[status], ...iconProps, ...props })
}

export default function ContractorStatus({status, kind, hideText, ...props}) {
    return (
        <>
            <Switch test={status}>
                {makeIcon(0, hideText, props)}
                {makeIcon(1, hideText, props)}
                {makeIcon(2, hideText, props)}
                {makeIcon(16, hideText, props)}
                {makeIcon(64, hideText, props)}
            </Switch>
            {!hideText && (kind === 1 ? providerStatuses[status] : consumerStatuses[status])}
        </>        
    )
}