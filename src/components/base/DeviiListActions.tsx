import React from "react";
import { TopToolbar, RefreshButton, ExportButton } from "react-admin";
import DeviiCreateButton from "./DeviiCreateButton";
import { Theme, useTheme } from "@mui/material/styles";
import DeviiTooltip from "./DeviiTooltip";
import { useNavigate } from "react-router-dom";
import DeviiPostFilterForm from "./DeviiPostFilterForm";

const buttonStyle = (theme: Theme, isShow: boolean | undefined) => ({
  minWidth: "auto!important",
  width: theme.spacing(4),
  height: theme.spacing(4),
  borderRadius: "50%",
  "& .MuiButton-startIcon": {
    margin: 0,
  },
  visibility: isShow ? "visible" : "hidden",
});

type ListActionProps = {
  title: string;
  refresh?: boolean;
  export?: boolean;
  filters: any;
};

const DeviiListActions = (props: ListActionProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleCreate = () => {
    navigate("create", { replace: true });
  };
  return (
    <>
      <DeviiPostFilterForm filters={props.filters} />
      <TopToolbar>
        <DeviiTooltip title={`Add ${props.title}`} placement="bottom-start">
          <DeviiCreateButton onClick={handleCreate}>+</DeviiCreateButton>
        </DeviiTooltip>
        <RefreshButton label="" sx={buttonStyle(theme, props.refresh)} />
        <ExportButton label="" sx={buttonStyle(theme, props.export)} />
      </TopToolbar>
    </>
  );
};

DeviiListActions.defaultProps = {
  refresh: true,
  export: true,
  title: "",
};

export default DeviiListActions;
