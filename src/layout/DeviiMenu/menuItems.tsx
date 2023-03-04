import { Person, PersonAdd, Settings } from "@mui/icons-material";
import {
  PolicyRulesIcon,
  GraphiQLIcon,
  RoleMgmtIcon,
  ProcessRulesIcon,
} from "components/icons";
import routes from "routes";
import { matchPath } from "react-router-dom";
import { getSubPath } from "utils";

export const adminRoutes: Array<string> = ["users", "invites"];
export const databaseRoutes: Array<string> = [
  "project/database",
  "process_rule",
  "/role_management",
  "/policy_rule",
  "/tenant",
  "/graphiql",
];

export type MenuItem = {
  id: number;
  name: string;
  icon: any;
  link: string;
  group: Array<string>;
};
export const dbPath = "/project/database/:id";
export const menuItems = (pathname: string): Array<MenuItem> => {
  const databaseId = matchPath(dbPath, getSubPath(pathname, dbPath))?.params.id;
  return [
    {
      id: 1,
      name: "Users",
      icon: <Person />,
      link: "/users",
      group: adminRoutes,
    },
    {
      id: 2,
      name: "Invites",
      icon: <PersonAdd />,
      link: "/invites",
      group: adminRoutes,
    },
    {
      id: 3,
      name: "Role Management",
      icon: <RoleMgmtIcon />,
      link: "/role_management",
      group: databaseRoutes,
    },
    {
      id: 4,
      name: "Policy",
      icon: <PolicyRulesIcon />,
      link: routes
        .filter(({ name }) => name === "Policy Rules")[0]
        ?.path?.replace(":id", databaseId ?? ""),
      group: databaseRoutes,
    },
    {
      id: 5,
      name: "Process Rules",
      icon: <ProcessRulesIcon />,
      link: "/process_rule",
      group: databaseRoutes,
    },
    {
      id: 6,
      name: "GraphiQL",
      icon: <GraphiQLIcon />,
      link: "/graphiql",
      group: databaseRoutes,
    },
    {
      id: 7,
      name: "Edit Schema",
      icon: <Settings />,
      link: "/tenant",
      group: databaseRoutes,
    },
  ];
};
