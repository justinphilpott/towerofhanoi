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
        src: url('./fonts/pattaya-latin-400-normal.woff2') format('woff2');
      }
    `}
  />
)
export default Fonts