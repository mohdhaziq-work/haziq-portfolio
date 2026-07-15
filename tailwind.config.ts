import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        surface: '#f8f9fa',
        'surface-2': '#f1f3f4',
        border: '#e8eaed',
        'border-light': '#f1f3f4',
        'text-primary': '#202124',
        'text-secondary': '#5f6368',
        'text-tertiary': '#80868b',
        accent: '#1a73e8',
        'accent-hover': '#1557b0',
        'accent-light': '#e8f0fe',
        'accent-surface': '#d2e3fc',
        success: '#34a853',
        warning: '#fbbc04',
        error: '#ea4335',
        coral: '#ff6d6a',
        mint: '#34a853',
        lavender: '#a8c7fa',
      },
      fontFamily: {
        display: ['Google Sans', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Google Sans Mono', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-sm': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'headline': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body-md': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'overline': ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.08em', fontWeight: '600' }],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        'full': '9999px',
      },
      boxShadow: {
        'chip': '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
        'card': '0 1px 3px 0 rgba(60,64,67,0.15), 0 4px 8px 3px rgba(60,64,67,0.1)',
        'card-hover': '0 2px 6px 0 rgba(60,64,67,0.15), 0 6px 14px 5px rgba(60,64,67,0.1)',
        'elevated': '0 4px 8px 3px rgba(60,64,67,0.15), 0 1px 3px rgba(60,64,67,0.3)',
        'modal': '0 8px 16px 8px rgba(60,64,67,0.15), 0 4px 8px rgba(60,64,67,0.3)',
      },
      spacing: {
        'section': '120px',
        'section-sm': '80px',
      },
      transitionTimingFunction: {
        'google': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'google-in': 'cubic-bezier(0, 0, 0.2, 1)',
        'google-out': 'cubic-bezier(0.4, 0, 1, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}
export default config
