/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)', 
        background: 'var(--color-background)', 
        foreground: 'var(--color-foreground)', 
        primary: {
          DEFAULT: 'var(--color-primary)', 
          foreground: 'var(--color-primary-foreground)', 
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)', 
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)', 
        },
        muted: {
          DEFAULT: 'var(--color-muted)', 
          foreground: 'var(--color-muted-foreground)', 
        },
        accent: {
          DEFAULT: 'var(--color-accent)', 
          foreground: 'var(--color-accent-foreground)', 
        },
        popover: {
          DEFAULT: 'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)', 
        },
        card: {
          DEFAULT: 'var(--color-card)', 
          foreground: 'var(--color-card-foreground)', 
        },
        success: {
          DEFAULT: 'var(--color-success)', 
          foreground: 'var(--color-success-foreground)', 
        },
        warning: {
          DEFAULT: 'var(--color-warning)', 
          foreground: 'var(--color-warning-foreground)', 
        },
        error: {
          DEFAULT: 'var(--color-error)', 
          foreground: 'var(--color-error-foreground)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '240': '60rem',
      },
      zIndex: {
        '60': '60',
        '100': '100',
        '150': '150',
        '200': '200',
        '1000': '1000',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'modal': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-in': 'slideIn 300ms ease-out',
        'pulse-subtle': 'pulseSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}