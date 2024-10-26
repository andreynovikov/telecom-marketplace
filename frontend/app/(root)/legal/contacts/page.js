'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'

import PageWrapper from '@/components/ui/page-wrapper'
import IconCard from '@/components/ui/icon-card'

import { IconMail, IconMapPin, IconPhone } from '@tabler/icons-react'

import { address, phone, emails } from '@/lib/settings'

const Header = ({ children }) => <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>{children}</Typography>
const Paragraph = ({ children }) => <Typography sx={{ mb: 1 }}>{children}</Typography>

export default function Contacts() {
    return (
        <PageWrapper title="Контакты">
            <Card sx={{ p: 3 }}>
                <Grid container spacing={2}>
                    {emails.map(({ address, description }) => (
                        <Grid item xs={12} md={6} key={address}>
                            <IconCard icon={IconMail} body={description} title={address} />
                        </Grid>
                    ))}
                    <Grid item xs={12} md={6}>
                        <IconCard icon={IconPhone} title={phone} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <IconCard icon={IconMapPin} title={address} />
                    </Grid>
                </Grid>

                <YMaps>
                    <Box sx={{ mt: 2, height:400 }}>
                        <Map width="100%" height="400px" defaultState={{ center: [59.916315, 30.377938], zoom: 16 }}>
                            <Placemark geometry={[59.916315, 30.377938]} />
                        </Map>
                    </Box>
                </YMaps>
            </Card>
        </PageWrapper>
    )
}
