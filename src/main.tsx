import { createRoot } from "react-dom/client";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./styles.ts";
import AppRoot from "./AppRoot.tsx";
import worker from "./msw/worker.ts";

worker.start();

createRoot(document.getElementById("root")!).render(
  <Router>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AppRoot />
    </ChakraProvider>
  </Router>
);
