import { ApolloProvider } from "@apollo/client";
import React, { ReactElement } from "react";
import { useApollo } from "./apolloClient";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { QUERY_URL } from "../constants";

type AppProviderProps = {
  children: React.ReactChild;
  initialApolloState?: any;
};
const AppProvider = ({
  children,
  initialApolloState,
}: AppProviderProps): ReactElement => {
  const client = useApollo(QUERY_URL, initialApolloState);

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
