const routes: Array<{ path: string; name: string }> = [
  {
    path: "/project",
    name: "Project",
  },
  {
    path: "/project/database/:id",
    name: "Database",
  },
  {
    path: "/project/database/:id/policy_rule",
    name: "Policy Rules",
  },
  {
    path: "/project/database/:id/policy_rule/create",
    name: "Add Policy Rule",
  },
  {
    path: "/project/database/:id/policy_rule/:id",
    name: "Edit Policy Rule",
  },
  {
    path: "/users",
    name: "Users",
  },
  {
    path: "/users/create",
    name: "Create User",
  },
  {
    path: "/users/:id",
    name: "Edit User",
  },
  {
    path: "/invites",
    name: "Invites",
  },
  {
    path: "/Profile",
    name: "Profile",
  },
];

export default routes;
