// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: '/admin/',
//   server: {
//     port: 7052,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5052', // Adjust the target to your API server
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// })


import {
  defineConfig,
  loadEnv
} from 'vite'
import react from '@vitejs/plugin-react'
import {
  fileURLToPath
} from 'url'
import {
  dirname
} from 'path'
import tailwindcss from '@tailwindcss/vite'

const __dirname = dirname(fileURLToPath(
  import.meta.url
))

export default defineConfig(({
  mode
}) => {
  const env = loadEnv(mode, __dirname, '')
  const appenv = env.VITE_APP_ENV || 'development'

  const portDetails = {
    production: Number(env.VITE_APP_PORT_PRD) || 7050,
    quality: Number(env.VITE_APP_PORT_QAS) || 7051,
    development: Number(env.VITE_APP_PORT_DEV) || 7052,
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],

    // Admin application is served under /admin
    base: '/admin/',

    server: {
      port: portDetails[appenv],
      host: true,
    },
  }
})