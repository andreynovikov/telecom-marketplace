'use client'

import { useState, useEffect } from 'react'

import Card from '@mui/material/Card'
import { H5, Paragraph } from '@/components/theme/Typography'

import { getContractors } from '@/components/contractor/queries'

export default function ConsumerStatus() {
    const [contractor, setContractor] = useState({})

    useEffect(() => {
        getContractors().then((result) => setContractor(result.length > 0 ? result[0] : {}))
    }, [])

    return <Card sx={{my: 3, px: 4, py: 2}}>
        <H5 mb={0.5} color="primary.main" fontWeight={600}>
            {contractor.status === 64 ? "Заказчик отклонён" :
                contractor.status === 16 ? "Заказчик подтверждён" :
                    contractor.status === 2 ? "Заказчик на проверке" :
                        contractor.inn ? "Ожидайте проверку заказчика" :
                            "Требуется действие"}
        </H5>
        <Paragraph color="grey.600">
            {contractor.status === 64 ? "С вами свяжутся для предоставления обратной связи" :
                contractor.status === 16 ? "С вами свяжутся, как только появится потребитель ваших услуг" :
                    contractor.status === 2 ? "С вами свяжутся для уточнения вопросов" :
                        contractor.inn ? "Информация будет проверена в ближайшее время" :
                            "Необходимо заполнить информацию о компании"}
        </Paragraph>
    </Card>
}