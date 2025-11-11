'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

import Image from 'next/image'
import Container from '@mui/material/Container'
import { styled }  from '@mui/material/styles'

import BazaarCard from '@/components/theme/BazaarCard'
import { H1, Paragraph } from '@/components/theme/Typography'

const Wrapper = styled(BazaarCard)({
    margin: "auto",
    padding: "3rem",
    maxWidth: "630px",
    textAlign: "center"
})

function OrderNumber() {
    const searchParams = useSearchParams()
    const order = searchParams.get('order')
    return <>№{ order }</>
}

export default function OrderCompletePage() {
    return <Container className="mt-2 mb-10">
        <Wrapper>
            <Image width={116} height={116} alt="complete" src="/assets/images/illustrations/party-popper.svg" />
            <H1 lineHeight={1.1} mt="1.5rem">
                Заказ <Suspense><OrderNumber /></Suspense> зарегистрирован
            </H1>
            <Paragraph color="grey.800" mt="0.3rem">
                Ожидайте звонок менеджера. Статус заказа можно проверить в личном кабинете.
            </Paragraph>
        </Wrapper>
    </Container>
}
