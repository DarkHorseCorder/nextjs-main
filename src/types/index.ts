/* eslint-disable @typescript-eslint/no-explicit-any */
import { RaRecord, Identifier } from "react-admin";
export interface User extends RaRecord {
  roleid: BigInt;
  first_name: String;
  last_name: String;
  email: string;
  phone: string | null;
  zipcode: string | null;
  state: string | null;
  company_name: String;
  company_size_id: Identifier;
  referred_by_id: Identifier;
  id: Identifier;
  createtime: Date;
}
export interface DatabaseType extends RaRecord {
  databaseid: BigInt;
  name: String;
  description: String;
}
export interface Role extends RaRecord {
  roleid: BigInt;
  name: String;
  login: String;
  createtime: Date;
  creatorid: Identifier;
  capabilities: [String];
  password_setby: Identifier;
  classes: RoleClass;
}
export interface RoleClass extends RaRecord {
  classid: BigInt;
  name: String;
  createtime: Date;
  creatorid: Identifier;
}

export interface AuthRoutes {
  base: string;
  query: string;
  roles_pbac: string;
}

export interface Schema {
  gql: string;
  json: {
    __schema: any;
  };
}
