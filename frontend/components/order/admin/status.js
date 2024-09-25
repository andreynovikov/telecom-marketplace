'use client'

import { makeSvgIcon } from '@/theme/icons'

import { IconFileImport, IconFileDots, IconFileX, IconFileCheck } from '@tabler/icons-react'

import { statuses } from '.'

const statusIcons = {
    0: IconFileImport,
    1: IconFileDots,
    8192: IconFileX,
    16384: IconFileCheck
}

const statusColors = {
    0: 'warning',
    1: 'primary',
    8192: 'disabled',
    16384: 'success'
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

export default function OrderStatus({status, hideText, ...props}) {
    return (
        <>
            <Switch test={status}>
                {makeIcon(0, hideText, props)}
                {makeIcon(1, hideText, props)}
                {makeIcon(16384, hideText, props)}
                {makeIcon(32768, hideText, props)}
            </Switch>
            {!hideText && statuses[status]}
        </>        
    )
}
