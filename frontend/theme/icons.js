import { SvgIcon } from '@mui/material'

export function makeSvgIcon(component, props) {
    return <SvgIcon component={component} {...props} sx={{ fill: 'none', ...props?.sx }} />
}
