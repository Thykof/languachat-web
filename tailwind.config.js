/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        'dark-girly': {
          primary: '#FF08D4',
          'primary-focus': '#d738ea',
          'primary-content': '#ffffff',
          secondary: '#D4FF08',
          'secondary-focus': '#b3fd58',
          'secondary-content': '#000',
          accent: '#08D4FF',
          'accent-focus': '#559ca3',
          'accent-content': '#ffffff',
          neutral: '#2a2e37',
          'neutral-focus': '#16181d',
          'neutral-content': '#ffffff',
          'base-100': '#323942',
          'base-200': '#2a2e37',
          'base-300': '#16181d',
          'base-content': '#ebecf0',
          info: '#66c7ff',
          success: '#87cf3a',
          warning: '#e1d460',
          error: '#ff6b6b',
          '--rounded-box': '1rem',
          '--rounded-btn': '.5rem',
          '--rounded-badge': '1.9rem',
          '--animation-btn': '.25s',
          '--animation-input': '.2s',
          '--btn-text-case': 'uppercase',
          '--navbar-padding': '.5rem',
          '--border-btn': '1px',
        },
      },
      'dark',
      'light',
    ],
  },
  plugins: [require('daisyui')],
};
