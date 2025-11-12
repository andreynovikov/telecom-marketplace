"use client"

import { usePathname } from "next/navigation"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider, responsiveFontSizes, createTheme } from "@mui/material/styles"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import merge from "lodash/merge"
import useSettings from "@/hooks/useSettings"
import customThemeOptions from "./theme-options"
import NextAppDirEmotionCacheProvider from "./emotion-cache"

const MuiThemeProvider = ({
  children
}) => {
  const pathname = usePathname()
  const {
    settings
  } = useSettings()
  const themeOptions = customThemeOptions(pathname)
  const mergedThemeOptions = merge({},
    {
      ...themeOptions,
      direction: settings.direction,
      cssVariables: {
        colorSchemeSelector: 'data',
      },
    }
  )
  let theme = createTheme(mergedThemeOptions)
  theme = responsiveFontSizes(theme)
  // theme shadows

  theme.shadows[1] = "0px 1px 3px rgba(3, 0, 71, 0.09)"
  theme.shadows[2] = "0px 4px 16px rgba(43, 52, 69, 0.1)"
  theme.shadows[3] = "0px 8px 45px rgba(3, 0, 71, 0.09)"
  theme.shadows[4] = "0px 0px 28px rgba(3, 0, 71, 0.01)"

  return <LocalizationProvider dateAdapter={AdapterMoment}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </LocalizationProvider>
}

export default MuiThemeProvider