/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        dark: {
          primary: '#0B0F1A',
          secondary: '#111827',
          tertiary: '#1F2937',
        },
        primary: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
        },
        accent: '#6366F1',
        text: {
          primary: '#E5E7EB',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        },
        border: 'rgba(255,255,255,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-in': 'bounceIn 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(79, 70, 229, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(79, 70, 229, 0.6)' },
        },
      },
      boxShadow: {
        'glow': '0 0 40px rgba(79, 70, 229, 0.4)',
        'glow-lg': '0 0 60px rgba(79, 70, 229, 0.6)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0F172A, #1E3A8A, #4F46E5)',
        'gradient-hero': 'linear-gradient(135deg, #0B0F1A 0%, #1E3A8A 50%, #4F46E5 100%)',
      },
    },
  },
  plugins: [],
}
