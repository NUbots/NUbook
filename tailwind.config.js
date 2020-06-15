/*eslint-env node*/

module.exports = {
  theme: {
    screens: {
      'xxs': '425px',
      'xs': '512px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      '3xl': '1600px',
      '4xl': '1920px',
    },
    extend: {
      colors: {
        'gray': {
          '100': '#f5f5f5',
          '200': '#eeeeee',
          '300': '#e0e0e0',
          '400': '#bdbdbd',
          '500': '#9e9e9e',
          '600': '#757575',
          '700': '#616161',
          '800': '#424242',
          '900': '#212121',
        },
        'nubots': {
          '100': '#FFF1D6',
          '200': '#FFEBC7',
          '300': '#FFDD9E',
          '400': '#FFCC6F',
          '500': '#F9A50D',
          '700': '#CC880D',
        },
        'primary': 'rgba(0, 0, 0, 0.87)',
        'primary-inverted': 'rgba(255, 255, 255, 0.87)',
        'primary-muted': 'rgba(0, 0, 0, 0.60)',
        'secondary': 'rgba(0, 0, 0, 0.54)',
        'secondary-inverted': 'rgba(255, 255, 255, 0.54)',
        'icon': 'rgba(0, 0, 0, 0.54)',
        'icon-inverted': 'rgba(255, 255, 255, 0.7)',
        'hint': 'rgba(0, 0, 0, 0.38)',
        'hint-inverted': 'rgba(255, 255, 255, 0.38)',
      },
      backgroundColor: {
        well: 'rgba(255, 255, 255, 0.1)',
      },
      padding: {
        '14': '3.5rem',
        '26': '6.5rem',
      },
      maxWidth: {
        'screen-xl': '1280px',
      },
    },
  },
  variants: {},
  plugins: [],
}
