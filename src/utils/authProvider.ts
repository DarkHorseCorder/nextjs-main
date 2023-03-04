import { AuthProvider, UserIdentity } from "react-admin";
import { ACCESS_TOKEN, BASE_URL, REFRESH_TOKEN, ROLE_ID } from "../constants";
import { hasAuth, removeStorageItem, storeAuth } from "./auth";

export const authProvider: AuthProvider = {
  login: function ({
    email,
    password,
    remember,
    tenantid,
  }: {
    email: string;
    password: string;
    remember?: boolean;
    tenantid?: number;
  }) {
    //Initialize variables
    const formdata = new FormData();
    formdata.append("login", email);
    formdata.append("password", password);
    formdata.append("tenantid", (tenantid ?? 14).toString());

    // Set any request options
    const requestOptions = new Request(`${BASE_URL}/auth`, {
      method: "POST",
      body: formdata,
      redirect: "follow",
    });

    // Login to the ToDo Devii database
    return fetch(requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.status < 200 || result.status >= 300) {
          throw new Error(result.error);
        }
        const {
          roleid,
          access_token,
          refresh_token,
          routes,
          rpb_schema,
          schema,
        } = result;
        storeAuth({
          access_token,
          refresh_token,
          roleid,
          remember,
          routes,
          rpb_schema,
          schema,
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
  },
  logout: () => {
    removeStorageItem(ACCESS_TOKEN);
    removeStorageItem(REFRESH_TOKEN);
    removeStorageItem(ROLE_ID);
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: (error: any) => {
    // removeStorageItem(ACCESS_TOKEN);
    // return Promise.reject({ message: "The token is invalid" });
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return hasAuth() ? Promise.resolve() : Promise.reject();
  },
  // get the user's profile
  getIdentity: (): Promise<UserIdentity> => Promise.resolve({} as UserIdentity),
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
