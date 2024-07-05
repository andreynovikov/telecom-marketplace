import { useState, useEffect } from 'react'

import Card from '@mui/material/Card'
import { H5, Paragraph } from '@/components/theme/Typography'

import { getContractors } from '@/components/contractor/queries'

export default function ContractorStatus() {
    const [contractor, setContractor] = useState({})

    useEffect(() => {
        getContractors().then((result) => setContractor(result.length > 0 ? result[0] : {}))
    }, [])

    return <Card sx={{px: 4, py: 2}}>
        <H5 mb={0.5} color="primary.main" fontWeight={600}>
            {contractor.status === 64 ? "Анкета поставщика отклонена" :
                contractor.status === 16 ? "Анкета поставщика подтверждена" :
                    contractor.status === 2 ? "Анкета поставщика на рассмотрении" :
                        contractor.inn && contractor.services?.length && contractor.geography?.length ? "Ожидайте рассмотрение анкеты" :
                            "Необходимо заполнить анкету поставщика"}
        </H5>
        <Paragraph color="grey.600">
            {contractor.status === 64 ? "С вами свяжутся для предоставления обратной связи" :
                contractor.status === 16 ? "С вами свяжутся, как только появится потребитель ваших услуг" :
                    contractor.status === 2 ? "С вами свяжутся для уточнения вопросов" :
                        contractor.inn && contractor.cover_letter && contractor.services?.length && contractor.geography?.length ? "Анкета будет рассмотрена в ближайшее время" :
                            "Чтобы начать рассмотрение анкеты, необходимо заполнить информацию о компании, указать географию и спектр предоставляемых услуг"}
        </Paragraph>
    </Card>
}