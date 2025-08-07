/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)",
        input: "var(--color-input)", 
        ring: "var(--color-ring)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)", 
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)", 
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", 
          foreground: "var(--color-secondary-foreground)", 
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", 
          foreground: "var(--color-destructive-foreground)", 
        },
        muted: {
          DEFAULT: "var(--color-muted)", 
          foreground: "var(--color-muted-foreground)", 
        },
        accent: {
          DEFAULT: "var(--color-accent)", 
          foreground: "var(--color-accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--color-popover)", 
          foreground: "var(--color-popover-foreground)", 
        },
        card: {
          DEFAULT: "var(--color-card)", 
          foreground: "var(--color-card-foreground)", 
        },
        success: {
          DEFAULT: "var(--color-success)",
          foreground: "var(--color-success-foreground)", 
        },
        warning: {
          DEFAULT: "var(--color-warning)", 
          foreground: "var(--color-warning-foreground)", 
        },
        error: {
          DEFAULT: "var(--color-error)", 
          foreground: "var(--color-error-foreground)", 
        },
        surface: {
          DEFAULT: "var(--color-surface)", 
          foreground: "var(--color-surface-foreground)", 
        },
        'text-primary': "var(--color-text-primary)",
        'text-secondary': "var(--color-text-secondary)", 
        'warm-canvas': "var(--color-warm-canvas)", 
        'sophisticated-depth': "var(--color-sophisticated-depth)", 
        'precious-metal': "var(--color-precious-metal)", 
        'pure-clarity': "var(--color-pure-clarity)", 
        'subtle-elevation': "var(--color-subtle-elevation)", 
        'comfortable-reading': "var(--color-comfortable-reading)", 
        'clear-hierarchy': "var(--color-clear-hierarchy)", 
        'confident-confirmation': "var(--color-confident-confirmation)", 
        'elegant-urgency': "var(--color-elegant-urgency)",
        'warm-concern': "var(--color-warm-concern)", 
      },
      fontFamily: {
        'headline': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'cta': ['Montserrat', 'sans-serif'],
        'accent': ['Cormorant Garamond', 'serif'],
        'head': ['Raleway', 'sans-serif'],
        'head1': ['"Josefin Sans"', 'sans-serif'],
        'syne': ['Syne', 'sans-serif'],
        'saira': ['Saira', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'headline': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'subheading': ['1.25rem', { lineHeight: '1.4' }],
        'body-large': ['1.125rem', { lineHeight: '1.6' }],
        'body-small': ['0.875rem', { lineHeight: '1.5' }],
      },
      spacing: {
        'xs': '8px',
        'sm': '13px',
        'md': '21px',
        'lg': '34px',
        'xl': '55px',
      },
      boxShadow: {
        'luxury': '0 4px 20px rgba(44, 44, 44, 0.08)',
        'luxury-hover': '0 12px 40px rgba(44, 44, 44, 0.15)',
        'luxury-elevated': '0 8px 40px rgba(44, 44, 44, 0.12)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'modal': '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'reveal': 'reveal 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-gentle': 'bounce 1s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'carousel': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'smooth': '300ms',
        'micro': '200ms',
        'carousel': '400ms',
        'reveal': '600ms',
      },
      backdropBlur: {
        'luxury': '10px',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        reveal: {
          '0%': {
            opacity: '0',
            transform: 'translateY(40px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}