/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
import * as React from "react";
import { Layout, LayoutProps } from "react-admin";
import DeviiAppBar from "./DeviiAppBar";
import DeviiMenu from "./DeviiMenu";
import { ReactQueryDevtools } from "react-query/devtools";

export default (props: LayoutProps) => {
  return (
    <>
      <Layout {...props} appBar={DeviiAppBar} menu={DeviiMenu} />
      <ReactQueryDevtools />
    </>
  );
};
