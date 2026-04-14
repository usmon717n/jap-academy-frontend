import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: { 
          DEFAULT: '#ea580c',
          dark: '#c2410c', 
          light: '#fff7ed', 
          border: '#fed7aa',
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        surface: '#fefcf9',
        ink: '#1c1917',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'Segoe UI', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 20px rgba(0, 0, 0, 0.04), 0 8px 30px rgba(234, 88, 12, 0.03), 0 1px 3px rgba(0, 0, 0, 0.02)',
        'premium-hover': '0 10px 40px rgba(0, 0, 0, 0.06), 0 12px 35px rgba(234, 88, 12, 0.08), 0 4px 10px rgba(0, 0, 0, 0.03)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'bubble': 'bubble 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        bubble: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-15px) scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
