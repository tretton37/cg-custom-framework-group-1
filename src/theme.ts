const palette = {
  white: '#ffffff',
  snow: '#fff6fa',
  lightGray: '#ced4da',
  gray: '#6c757d',
  cadmiumBlue: '#0c0c91',
  darkImperialBlue: '#0a0a7b',
  cetaceanBlue: '#02023b',
  ceil: '#9998d1',
  guppieGreen: '#05e273',
};

export const colors = {
  section: palette.snow,
  surface: palette.white,
  title: palette.cadmiumBlue,
  text: palette.cetaceanBlue,
  primary: palette.cadmiumBlue,
  accent: palette.guppieGreen,
  lightGray: palette.lightGray,
  gray: palette.gray,
  button: {
    background: {
      default: palette.cadmiumBlue,
      hover: palette.darkImperialBlue,
      active: palette.darkImperialBlue,
    },
    text: {
      default: palette.guppieGreen,
      hover: palette.guppieGreen,
      active: palette.white,
    },
    border: {
      default: palette.cadmiumBlue,
      hover: palette.darkImperialBlue,
      active: palette.cadmiumBlue,
    },
  },
  input: {
    text: {
      default: palette.ceil,
      hover: palette.cadmiumBlue,
    },
    border: {
      default: palette.ceil,
      hover: palette.cadmiumBlue,
    },
  },
};

export const space = {
  xxs: '1px',
  xs: '0.125rem',
  s: '0.25rem',
  m: '0.5rem',
  l: '1rem',
  xl: '2rem',
  xxl: '3rem',
};

export const font = {
  family: "'Sora', sans-serif",
  size: {
    s: '1rem',
    m: '1.5rem',
    l: '2rem',
  },
  lineHeight: 1.2,
};
