import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "../themes/theme";
import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
