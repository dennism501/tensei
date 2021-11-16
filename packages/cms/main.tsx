import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './core'
import './load-icons'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

import { CmsRoute } from '@tensei/components'
import { useAuthStore } from './store/auth'

import '@tensei/eui/dist/eui_theme_tensei_light.css'
import { AuthRoutes } from './pages/components/auth/routes'
import { SettingsRoutes } from './pages/components/settings/routes'
import { DashboardRoutes } from './pages/components/dashboard/routes'
import { useEuiTheme, EuiThemeProvider } from '@tensei/eui/lib/services/theme'

interface ThemeExtensions {
  colors: {
    bgShade: string
    primaryTransparent: string
  }
}

const extensions = {
  colors: {
    LIGHT: {
      bgShade: '#f9f9f9',
      primaryTransparent: 'rgba(35, 70, 248, 0.2)'
    },
    DARK: {
      bgShade: '#f9f9f9',
      primaryTransparent: 'rgba(35, 70, 248, 0.2)'
    }
  }
}

const App: React.FunctionComponent = ({ children }) => {
  const [booted, setBooted] = useState(false)
  const [routes, setRoutes] = useState<CmsRoute[]>([])
  const { euiTheme } = useEuiTheme<ThemeExtensions>()

  const { user, setUser } = useAuthStore()

  const value = {
    user,
    setUser,
    booted,
    setBooted,
    routes,
    setRoutes
  }

  window.Tensei.ctx = value

  useEffect(() => {
    window.Tensei.client.get('csrf')
  }, [])

  return (
    <StyledThemeProvider theme={euiTheme}>
      {booted ? children : 'Booting app...'}
    </StyledThemeProvider>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <EuiThemeProvider modify={extensions}>
      <App>
        <AuthRoutes />
        <SettingsRoutes />
        <DashboardRoutes />
      </App>
    </EuiThemeProvider>
  </BrowserRouter>,
  document.querySelector('#app')
)

window.React = React as any
window.ReactDOM = ReactDOM
