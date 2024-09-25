import { SvgIcon } from '@mui/material'

import { IconPaperclip, IconPencil, IconTrash } from '@tabler/icons-react'

export function makeSvgIcon(component, props) {
    return <SvgIcon component={component} {...props} sx={{ fill: 'none', ...props?.sx }} />
}

export const EditIcon = (props) => makeSvgIcon(IconPencil, props)
export const DeleteIcon = (props) => makeSvgIcon(IconTrash, props)
export const AttachIcon = (props) => makeSvgIcon(IconPaperclip, props)
