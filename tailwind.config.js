/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ['var(--font-cinzel)', 'serif'],
        'bungee-spice': ['var(--font-bungee-spice)', 'cursive'],
      },
      colors: {
        'calc-dark': '#0F372F',
        'calc-gold': '#ECBC6B',
        'calc-dark-light': '#1a4a3f',
        'calc-gold-light': '#f4d19a',
        'calc-gold-dark': '#d4a85a',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'calc-gradient': 'linear-gradient(135deg, #0F372F 0%, #1a4a3f 100%)',
      },
    },
  },
  plugins: [],
}
