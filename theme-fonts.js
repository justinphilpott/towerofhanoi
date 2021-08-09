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
      }
    `}
  />
)
export default Fonts