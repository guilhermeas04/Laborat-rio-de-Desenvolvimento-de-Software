import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1f3b73',
          dark: '#1a3363'
        }
      },
      borderRadius: {
        xl: '0.75rem'
      }
    },
  },
  plugins: [],
} satisfies Config
