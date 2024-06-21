import { makeSvgIcon } from '@/theme/icons'

import { IconClipboardPlus, IconClipboardTypography, IconClipboardData, IconClipboardCheck, IconClipboardX } from '@tabler/icons-react'

const statuses = {
    0: 'новая',
    1: 'обновлённая',
    2: 'на рассмотрении',
    16: 'подтверждённая',
    64: 'отклонённая'
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

export default function ContractorStatus({status, ...props}) {
    return (
        <span>
            <Switch test={status}>
                {makeSvgIcon(IconClipboardPlus, { value: 0, color: "warning", ...iconProps, ...props })}
                {makeSvgIcon(IconClipboardTypography, { value: 1, color: "warning", ...iconProps, ...props })}
                {makeSvgIcon(IconClipboardData, { value: 2, color: "primary", ...iconProps, ...props })}
                {makeSvgIcon(IconClipboardCheck, { value: 16, color: "success", ...iconProps, ...props })}
                {makeSvgIcon(IconClipboardX, { value: 64, color: "error", ...iconProps, ...props })}
            </Switch>
            {statuses[status]}
        </span>        
    )
}