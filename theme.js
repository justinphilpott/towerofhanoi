import { extendTheme } from "@chakra-ui/react"
const theme = extendTheme({
  fonts: {
    heading: "Pattaya",
  },
  colors: {
    salmon: {
      500: '#E78059',
      600: '#D4673E',
    },
    gold: {
      500: '#FDC173',
      600: '#EDB163'
    }
  }
});
export default theme