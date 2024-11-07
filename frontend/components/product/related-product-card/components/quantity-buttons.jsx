import Button from '@mui/material/Button'

import { FlexBox } from '@/components/theme/flex-box'
import { Paragraph } from '@/components/theme/Typography'

import { PlusIcon, MinusIcon } from '@/theme/icons'

export default function QuantityButtons(props) {
    const {
        quantity,
        handleDecrement,
        handleIncrement
    } = props || {}
    return <FlexBox width="30px" alignItems="center" className="add-cart" flexDirection="column-reverse" justifyContent={quantity ? "space-between" : "flex-start"}>
        {quantity == 0 && (
            <Button color="primary" variant="outlined" onClick={handleIncrement} sx={{ padding: "3px" }}>
                <PlusIcon fontSize="small" />
            </Button>
        )}

        {quantity > 0 && (
            <>
                {/*
                <Paragraph color="text.primary" fontWeight="600">
                    {quantity}
                </Paragraph>
                */
                }

                <Button color="primary" variant="outlined" onClick={handleDecrement} sx={{ padding: "3px" }}>
                    <MinusIcon fontSize="small" />
                </Button>
            </>
        )}
    </FlexBox>
}