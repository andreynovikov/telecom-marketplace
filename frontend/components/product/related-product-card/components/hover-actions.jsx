import IconButton from '@mui/material/IconButton'

import { ViewIcon } from '@/theme/icons'

import { HoverIconWrapper } from '../styles'

export default function HoverActions({
    isFavorite,
    toggleFavorite,
    toggleView
  }) {
    return <HoverIconWrapper className="hover-box">
        <IconButton onClick={toggleView}>
            <ViewIcon color="disabled" fontSize="small" />
        </IconButton>

        {/*
        <IconButton onClick={toggleFavorite}>
            {isFavorite ? <Favorite color="primary" fontSize="small" /> : <FavoriteBorder fontSize="small" color="disabled" />}
        </IconButton>
        */
        }
    </HoverIconWrapper>
}