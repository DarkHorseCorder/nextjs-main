import { useStore } from "react-admin";

type TUseSidebar = [boolean, (open: boolean) => void];
export const useSidebar = (): TUseSidebar =>
  useStore<boolean>("sidebar.open", true);
