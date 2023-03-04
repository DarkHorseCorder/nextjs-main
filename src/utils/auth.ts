import localStorage from "local-storage-fallback";
import { getCookie, deleteCookie, hasCookie, setCookie } from "cookies-next";
import { AuthRoutes, Schema } from "types";
import {
  ACCESS_TOKEN,
  QUERY_URL,
  REFRESH_TOKEN,
  ROLES_PBAC,
  ROLE_ID,
  RPB_SCHEMA,
  SCHEMA,
} from "../constants";

export const getStorageItem = (key: string): string | null => {
  return getCookie(key) ?? localStorage.getItem(key);
};

export const removeStorageItem = (key: string): void => {
  window.sessionStorage.removeItem(key);
  hasCookie(key) ? deleteCookie(key) : localStorage.removeItem(key);
};

export const hasAuth = (): boolean => {
  const authorization = getStorageItem(ACCESS_TOKEN);
  return !!authorization;
};

export const storeAuth = ({
  access_token,
  refresh_token,
  remember,
  roleid,
  routes,
  rpb_schema,
  schema,
}: {
  access_token: string;
  refresh_token: string;
  remember?: boolean;
  roleid: string;
  routes: AuthRoutes;
  rpb_schema: Schema;
  schema: Schema;
}): void => {
  const rpbSchema = JSON.stringify(rpb_schema.json.__schema);
  const querySchema = JSON.stringify(schema.json.__schema);
  localStorage.setItem(RPB_SCHEMA, rpbSchema);
  localStorage.setItem(SCHEMA, querySchema);
  if (remember) {
    localStorage.setItem(ACCESS_TOKEN, access_token);
    localStorage.setItem(REFRESH_TOKEN, refresh_token);
    localStorage.setItem(ROLE_ID, roleid);
    localStorage.setItem(QUERY_URL, routes.query);
    localStorage.setItem(ROLES_PBAC, routes.roles_pbac);
  } else {
    setCookie(ACCESS_TOKEN, access_token);
    setCookie(REFRESH_TOKEN, refresh_token);
    setCookie(ROLE_ID, roleid);
    setCookie(QUERY_URL, routes.query);
    setCookie(ROLES_PBAC, routes.roles_pbac);
  }
};
