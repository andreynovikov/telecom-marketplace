'use client'

import { useFormState } from 'react-dom'
import Button from '@mui/material/Button'

import EyeToggleButton from '@/components/theme/pages-sections/sessions/components/eye-toggle-button'
import usePasswordVisible from '@/components/theme/pages-sections/sessions/use-password-visible'
import BazaarTextField from '@/components/theme/BazaarTextField'

import { register } from '@/lib/actions'

export default function SignUp() {
    const [result, dispatch] = useFormState(register, undefined)
    const { visiblePassword, togglePasswordVisible } = usePasswordVisible()
    const inputProps = {
        endAdornment: <EyeToggleButton show={visiblePassword} click={togglePasswordVisible} />
    }

    return (
        <form action={dispatch}>
            <BazaarTextField
                mb={1.5}
                fullWidth
                name="email"
                size="small"
                type="email"
                variant="outlined"
                label="Адрес электронной почты"
                placeholder="example@mail.ru" />

            <BazaarTextField
                mb={1.5}
                fullWidth
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
                size="small"
                autoComplete="on"
                name="confirm"
                variant="outlined"
                label="Подтвердите пароль"
                placeholder="*********"
                type={visiblePassword ? "text" : "password"}
                InputProps={inputProps} />

            <Button fullWidth type="submit" color="primary" variant="contained" size="large">
                Зарегистрироваться
            </Button>
        </form>
    )
}
