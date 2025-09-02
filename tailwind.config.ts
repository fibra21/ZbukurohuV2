import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from brandbook
        'brand-primary': '#F9E7E7',
        'brand-primary-dark': '#F5D1D1',
        'brand-primary-light': '#FCF3F3',
        'brand-secondary': '#E5C6A8',
        'brand-secondary-dark': '#D8B899',
        'brand-secondary-light': '#F0D8C4',
        'brand-accent': '#D4AF37',
        'brand-accent-dark': '#C19B2F',
        'brand-accent-light': '#E5C94D',
        
        // Neutral colors
        'neutral': {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        
        // Text colors
        'text-primary': '#2E2E2E',
        'text-secondary': '#525252',
        'text-muted': '#737373',
        'text-inverse': '#FFFFFF',
        
        // Surface colors
        'surface-base': '#FFFFFF',
        'surface-muted': '#FAFAFA',
        'surface-elevated': '#FFFFFF',
        
        // Semantic colors
        'semantic-success': '#22C55E',
        'semantic-warning': '#F59E0B',
        'semantic-error': '#EF4444',
        'semantic-info': '#3B82F6',
      },
      fontFamily: {
        'heading': ['Playfair Display', 'Cormorant', 'serif'],
        'body': ['Inter', 'Poppins', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
      },
      fontWeight: {
        'normal': 400,
        'medium': 500,
        'semibold': 600,
        'bold': 700,
      },
      lineHeight: {
        'tight': 1.25,
        'normal': 1.5,
        'relaxed': 1.625,
        'loose': 2,
      },
      letterSpacing: {
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
      },
      spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '32': '128px',
      },
      borderRadius: {
        'none': '0px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
        'slow': '400ms',
      },
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.2, 0, 0, 1)',
        'emphasized': 'cubic-bezier(0.05, 0.7, 0.1, 1)',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-brand": "linear-gradient(to bottom right, #FCF3F3, #F0D8C4)",
      },
    },
  },
  plugins: [],
};

export default config;
