/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220, 15%, 95%)',
        accent: 'hsl(130, 70%, 45%)',
        primary: 'hsl(210, 95%, 50%)',
        surface: 'hsl(0, 0%, 100%)',
        textPrimary: 'hsl(220, 15%, 20%)',
        textSecondary: 'hsl(220, 15%, 50%)',
      },
      borderRadius: {
        lg: '16px',
        md: '10px',
        sm: '6px',
      },
      spacing: {
        lg: '20px',
        md: '12px',
        sm: '8px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(220, 15%, 10%, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'fade-in-fast': 'fadeIn 100ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-in-out',
        'pulse-accent': 'pulseAccent 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseAccent: {
          '0%, 100%': { backgroundColor: 'hsl(130, 70%, 45%)' },
          '50%': { backgroundColor: 'hsl(130, 70%, 55%)' },
        },
      },
    },
  },
  plugins: [],
};

