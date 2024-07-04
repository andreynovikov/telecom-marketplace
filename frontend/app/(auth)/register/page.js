'use client'

import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import EyeToggleButton from '@/components/theme/pages-sections/sessions/components/eye-toggle-button'
import usePasswordVisible from '@/components/theme/pages-sections/sessions/use-password-visible'
import BazaarTextField from '@/components/theme/BazaarTextField'

import { register } from '@/lib/actions'

const altchaStrings = {
    "error": "Проверка не удалясь, попробуйте позже",
    "expired": "Проверка устарела, попробуйте снова",
    "label": "Я не робот",
    "verified": "Успешная проверка",
    "verifying": "Проверяем...",
    "waitAlert": "Проверяем... пожалуйста, подождите"
}

export default function SignUp() {
    const [result, dispatch] = useFormState(register, undefined)
    const { visiblePassword, togglePasswordVisible } = usePasswordVisible()
    const inputProps = {
        endAdornment: <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
    }

    useEffect(() => {
        import('altcha')
    }, [])

    return (
        <form action={dispatch}>
            <BazaarTextField
                mb={1.5}
                fullWidth
                required
                name="name"
                size="small"
                type="text"
                variant="outlined"
                label="Фамилия Имя Отчество"
                placeholder="Кузнецов Пётр Иванович" />

            <BazaarTextField
                mb={1.5}
                fullWidth
                required
                name="email"
                size="small"
                type="email"
                variant="outlined"
                label="Адрес электронной почты"
                placeholder="example@mail.ru" />

            <BazaarTextField
                mb={1.5}
                fullWidth
                name="phone"
                size="small"
                type="phone"
                variant="outlined"
                label="Контактный телефон"
                placeholder="+7 999 123 45 67" />

            <BazaarTextField
                mb={1.5}
                fullWidth
                required
                size="small"
                name="password"
                label="Пароль"
                variant="outlined"
                autoComplete="on"
                placeholder="*********"
                type={visiblePassword ? "text" : "password"}
                helperText={result?.message} error={Boolean(result?.error)}
                InputProps={inputProps} />

            <BazaarTextField
                mb={2}
                fullWidth
                required
                size="small"
                autoComplete="on"
                name="confirm"
                variant="outlined"
                label="Подтвердите пароль"
                placeholder="*********"
                type={visiblePassword ? "text" : "password"}
                InputProps={inputProps} />

            <Box sx={{ mb: 2 }}>
                <altcha-widget
                    challengeurl={process.env.NEXT_PUBLIC_API_CAPTCHA_CHALLENGE}
                    strings={JSON.stringify(altchaStrings)}
                    debug
                    workers={2}
                    hidefooter />
            </Box>

            <Button fullWidth type="submit" color="primary" variant="contained" size="large">
                Зарегистрироваться
            </Button>
        </form>
    )
}
