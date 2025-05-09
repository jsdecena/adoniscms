/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp } from '@inertiajs/react'
import { initThemeMode } from 'flowbite-react'
import { createRoot } from 'react-dom/client'
import '../css/app.css'
import QueryProvider from '../api'
import { ToastProvider } from '../ui/components/ToastProvider'

const appName = import.meta.env.VITE_APP_NAME || 'CMS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name) => {
    return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'))
  },

  setup({ el, App, props }) {
    createRoot(el).render(
      <ToastProvider>
        <QueryProvider>
          <App {...props} />
        </QueryProvider>
      </ToastProvider>
    )
  },
})

initThemeMode()
