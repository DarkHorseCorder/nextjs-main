schema {
      query: Query
  mutation: Mutation
}
type Aggregates {
      avg(subquery: String, filter: String, having: String, ordering: [String], limit: Int, offset: Int, distincton: [String]): GenericScalar
  count(subquery: String, filter: String, having: String, ordering: [String], limit: Int, offset: Int, distincton: [String]): GenericScalar
  max(subquery: String, filter: String, having: String, ordering: [String], limit: Int, offset: Int, distincton: [String]): GenericScalar
  min(subquery: String, filter: String, having: String, ordering: [String], limit: Int, offset: Int, distincton: [String]): GenericScalar
  sum(subquery: String, filter: String, having: String, ordering: [String], limit: Int, offset: Int, distincton: [String]): GenericScalar
}
scalar DateTime
scalar GenericScalar
type Mutation {
      create_policy_rule(input: policy_ruleInput): policy_rule
  create_role(input: roleInput): role
  create_role_class(input: role_classInput): role_class
  create_role_contactinfo(input: role_contactinfoInput): role_contactinfo
  delete_policy_rule(ruleid: ID!): policy_rule
  delete_role(roleid: ID!): role
  delete_role_class(classid: ID!): role_class
  delete_role_contactinfo(roleid: ID!): role_contactinfo
  update_policy_rule(input: policy_ruleInput, ruleid: ID!): policy_rule
  update_role(input: roleInput, roleid: ID!): role
  update_role_class(classid: ID!, input: role_classInput): role_class
  update_role_contactinfo(input: role_contactinfoInput, roleid: ID!): role_contactinfo
}
type Query {
      Aggregates: Aggregates
  Utility: Utility
  capability(filter: String, ordering: [String], limit: Int, offset: Int): [capability]
  package(filter: String, ordering: [String], limit: Int, offset: Int): [package]
  package_function(filter: String, ordering: [String], limit: Int, offset: Int): [package_function]
  policy_rule(filter: String, ordering: [String], limit: Int, offset: Int): [policy_rule]
  role(filter: String, ordering: [String], limit: Int, offset: Int): [role]
  role_class(filter: String, ordering: [String], limit: Int, offset: Int): [role_class]
  role_contactinfo(filter: String, ordering: [String], limit: Int, offset: Int): [role_contactinfo]
  tenant(filter: String, ordering: [String], limit: Int, offset: Int): [tenant]
  tenant_contactinfo(filter: String, ordering: [String], limit: Int, offset: Int): [tenant_contactinfo]
}
type Utility {
      introspect: GenericScalar
  role_token(roleid: Int!): String
}
type capability {
      capability: ID!
  package: String!
  description: String!
}
type package {
      package: ID!
  description: String!
  licensecost: Float!
}
type package_function {
      name: ID!
  package: ID!
}
type policy_rule {
      ruleid: ID!
  tenantid: Int!
  name: String!
  filter: String
  creatorid: Int!
  createtime: DateTime
  capabilities: [String]
  roles: [Int]
  classes: [Int]
  targets: [String]
}
input policy_ruleInput {
      capabilities: [String]
  classes: [ID]
  roles: [ID]
  targets: [String]
  name: String!
  filter: String
}
type role {
      roleid: ID!
  login: String!
  name: String!
  tenantid: Int
  parentid: Int
  creatorid: Int!
  createtime: DateTime
  deleted: Boolean
  classes: [role_class]
  capabilities: [String]
  children: [role]
  tenant: tenant
  contactinfo: role_contactinfo
  parent: role
  password_createtime: DateTime!
  password_setby: Int!
}
input roleInput {
      tenantid: Int!
  parentid: Int
  classes: [Int]
  capabilities: [String]
  login: String!
  name: String!
  deleted: Boolean
  password: String
}
type role_class {
      classid: ID!
  name: String!
  tenantid: Int!
  creatorid: Int!
  createtime: DateTime
  inherit: String!
  members: [role]
}
input role_classInput {
      name: String!
  tenantid: Int!
  inherit: String!
  members: [ID]
}
type role_contactinfo {
      address: String!
  city: String!
  stateprov: String!
  mailcd: String!
  phone: String!
  email: String!
  roleid: ID!
  role: role
}
input role_contactinfoInput {
      roleid: ID!
  address: String!
  city: String!
  stateprov: String!
  mailcd: String!
  phone: String!
  email: String!
}
type tenant {
      tenantid: ID!
  name: String!
  platform: String!
  host: String!
  database: String!
  credential: String!
  createtime: DateTime
  contactinfo: tenant_contactinfo
  packagelist: [String]
}
type tenant_contactinfo {
      address: String!
  city: String!
  stateprov: String!
  mailcd: String!
  phone: String!
  email: String!
  tenantid: ID!
  tenant: tenant
}
