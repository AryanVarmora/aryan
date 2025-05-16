// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          background: {
            primary: '#0a0a0a',
            secondary: '#121212',
            tertiary: '#1e1e1e',
          },
          accent: {
            primary: '#f43f5e',
            secondary: '#3b82f6',
            tertiary: '#10b981',
          },
        },
        fontFamily: {
          heading: ['"Clash Display"', 'sans-serif', 'ui-sans-serif', 'system-ui'],
          body: ['"Inter"', 'sans-serif', 'ui-sans-serif', 'system-ui'],
          mono: ['"JetBrains Mono"', 'monospace', 'ui-monospace'],
        },
        animation: {
          'text-reveal': 'text-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards',
          'fade-in': 'fade-in 0.8s ease forwards',
          'slide-up': 'slide-up 0.8s ease forwards',
          'float': 'float 3s ease-in-out infinite',
        },
        keyframes: {
          'text-reveal': {
            '0%': {
              transform: 'translate(0, 100%)',
            },
            '100%': {
              transform: 'translate(0, 0)',
            },
          },
          'fade-in': {
            '0%': {
              opacity: '0',
            },
            '100%': {
              opacity: '1',
            },
          },
          'slide-up': {
            '0%': {
              transform: 'translateY(100px)',
              opacity: '0',
            },
            '100%': {
              transform: 'translateY(0)',
              opacity: '1',
            },
          },
          'float': {
            '0%, 100%': {
              transform: 'translateY(0)',
            },
            '50%': {
              transform: 'translateY(-10px)',
            },
          },
        },
      },
    },
    plugins: [],
  }