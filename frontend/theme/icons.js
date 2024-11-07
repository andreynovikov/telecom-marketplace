import { SvgIcon } from '@mui/material'

import {
    IconMinus,
    IconPaperclip,
    IconPencil,
    IconPlus,
    IconTrash,
    IconEye,
    IconX
} from '@tabler/icons-react'

export function makeSvgIcon(component, props) {
    return <SvgIcon component={component} {...props} sx={{ fill: 'none', ...props?.sx }} />
}

export const EditIcon = (props) => makeSvgIcon(IconPencil, props)
export const DeleteIcon = (props) => makeSvgIcon(IconTrash, props)
export const AttachIcon = (props) => makeSvgIcon(IconPaperclip, props)
export const ViewIcon = (props) => makeSvgIcon(IconEye, props)
export const CloseIcon = (props) => makeSvgIcon(IconX, props)
export const PlusIcon = (props) => makeSvgIcon(IconPlus, props)
export const MinusIcon = (props) => makeSvgIcon(IconMinus, props)
