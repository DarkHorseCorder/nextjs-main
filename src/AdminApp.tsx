// eslint-disable-next-line jsx-a11y/media-has-caption
import { ReactElement, useEffect, useState } from "react";
import {
  Admin,
  Resource,
  combineDataProviders,
  ListGuesser,
  DataProvider,
} from "react-admin";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  useApolloClient,
  ApolloClient,
  NormalizedCacheObject,
} from "@apollo/client";
import { authProvider } from "./utils/authProvider";
import { deviiDataProvider, deviiDataProvderPbac } from "./utils/dataProvider";
// eslint-disable-next-line import/namespace
import { Layout } from "./layout";
import { DeviiProgress } from "components/base";
import { ROLES_PBAC } from "./constants";
import { useApollo } from "utils/apolloClient";
import users from "features/users";
import { LoginPage } from "features/auth";
import DeviiNotification from "layout/DeviiNotification";

const App = (): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [combinedDataProvider, setCombinedDataProvider] = useState<any>(null);
  const queryClient = useApolloClient();
  const roleClient = useApollo(ROLES_PBAC);
  const theme = useTheme();
  useEffect(() => {
    const fetchProvider = async () => {
      await authProvider.checkAuth(null).catch(() => {
        console.log("Not Auth");
      });
      const dp = combineDataProviders(
        (resource: string): DataProvider<string> => {
          switch (resource) {
            case "users":
            case "temp_registration":
            case "invites":
            case "company_size":
            case "referred_by":
            case "database":
            case "database_platforms":
            case "database_environments":
            case "user_types":
            case "user_password_reset_requests":
              return deviiDataProvider(
                queryClient as ApolloClient<NormalizedCacheObject>
              );
            case "role":
            case "role_class":
            case "policy_rule":
            case "tenant":
            case "capability":
              return deviiDataProvderPbac(
                roleClient as ApolloClient<NormalizedCacheObject>
              );
            default:
              throw new Error(`Unknown resource: ${resource}`);
          }
        }
      );
      setCombinedDataProvider(() => dp);
    };

    fetchProvider();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: `${theme.palette?.background?.default}`,
        height: "100vh",
      }}
    >
      {!combinedDataProvider ? (
        <DeviiProgress color="primary" />
      ) : (
        <Admin
          authProvider={authProvider}
          dataProvider={combinedDataProvider}
          theme={theme}
          layout={Layout}
          loginPage={LoginPage}
          notification={DeviiNotification}
          requireAuth
        >
          <Resource name="users" {...users} />
          <Resource name="invites" list={ListGuesser} />
        </Admin>
      )}
    </Box>
  );
};

export default App;
