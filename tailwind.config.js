module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          'base-100': 'hsl(0, 0%, 99%)',
          'base-200': 'hsl(200, 65%, 97%)',
          'base-300': 'hsl(210, 55%, 68%)',
          primary: 'hsl(0, 0%, 22%)',
          error: 'hsl(0, 60%, 67%)',
          info: 'hsl(210, 55%, 68%)',
          success: 'hsl(120, 40%, 69%)',
        },
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          primary: 'hsl(222, 35%, 22%)',
          'primary-content': 'hsl(222, 65%, 84%)',
          'base-100': 'hsl(230, 10%, 14%)',
          'base-200': 'hsl(230, 18%, 18%)',
          'base-300': 'hsl(230, 25%, 23%)',
          error: 'hsl(0, 50%, 25%)',
          info: 'hsl(210, 50%, 24%)',
          success: 'hsl(130, 35%, 23%)',
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
};
