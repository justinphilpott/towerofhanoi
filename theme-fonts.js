import { Global } from "@emotion/react"
const Fonts = () => (
  <Global
    styles={`
      /* pattaya-latin-400-normal*/
      @font-face {
        font-family: 'Pattaya';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: url('./fonts/pattaya-regular-webfont.woff2') format('woff2'), url('./fonts/pattaya-regular-webfont.woff') format('woff');
        unicode-range: U+21,U+2E,U+3F,U+47,U+48,U+4C,U+51,U+53,U+54,U+57,U+61,U+63-69,U+6C-70,U+72-75,U+77;
      }
    `}
  />
)
export default Fonts