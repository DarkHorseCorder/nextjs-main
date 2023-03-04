/* eslint-disable import/no-named-as-default */
import { ACCESS_TOKEN, QUERY_URL } from "../../constants";
import GraphiQL from "graphiql";
import { getStorageItem } from "utils/auth";

const Graphiql = () => {
  const queryUrl = getStorageItem(QUERY_URL) ?? "";
  const token = getStorageItem(ACCESS_TOKEN);

  return (
    <GraphiQL
      fetcher={async (graphQLParams) => {
        const data = await fetch(queryUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(graphQLParams),
          credentials: "same-origin",
        });
        return data.json().catch(() => data.text());
      }}
    />
  );
};

export default Graphiql;
