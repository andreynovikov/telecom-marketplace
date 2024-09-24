import Card from "@mui/material/Card"
import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField"
// GLOBAL CUSTOM COMPONENTS

import { FlexBetween, FlexBox } from "@/components/theme/flex-box"
import { H5, H6, Paragraph } from "@/components/theme/Typography"
// CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "@/lib"
// ==============================================================


// ==============================================================
export default function TotalSummary({
    total,
    discount
}) {
    return <Card sx={{
        px: 3,
        py: 4
    }}>
        <H5 mt={0} mb={2}>
            Общая стоимость
        </H5>

        {/*
      <FlexBetween mb={1.5}>
        <Paragraph color="grey.600">Subtotal:</Paragraph>
        <H6>{currency(total)}</H6>
      </FlexBetween>

      <FlexBetween mb={1.5}>
        <Paragraph color="grey.600">Shipping fee:</Paragraph>

        <FlexBox alignItems="center" gap={1} maxWidth={100}>
          <Paragraph>$</Paragraph>
          <TextField color="info" defaultValue={10} type="number" fullWidth />
        </FlexBox>
      </FlexBetween>

      <FlexBetween mb={1.5}>
        <Paragraph color="grey.600">Discount(%):</Paragraph>

        <FlexBox alignItems="center" gap={1} maxWidth={100}>
          <Paragraph>$</Paragraph>
          <TextField color="info" defaultValue={discount} type="number" fullWidth />
        </FlexBox>
      </FlexBetween>

      <Divider sx={{
      my: 2
    }} />

    */
        }
        <FlexBetween mb={2}>
            <H6>Всего:</H6>
            <H6>{currency(total)}</H6>
        </FlexBetween>
    </Card>
}