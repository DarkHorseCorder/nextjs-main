import * as React from "react";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslate, useSidebarState } from "react-admin";
import { DeviiTooltip } from "components/base";

const PREFIX = "RaSidebarToggleButton";

const SidebarToggleButtonClasses = {
  menuButtonIconClosed: `${PREFIX}-menuButtonIconClosed`,
  menuButtonIconOpen: `${PREFIX}-menuButtonIconOpen`,
};

const StyledIconButton = styled(IconButton, {
  name: PREFIX,
  overridesResolver: (_props, styles) => styles.root,
})(({ theme }) => ({
  [`& .${SidebarToggleButtonClasses.menuButtonIconClosed}`]: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: "rotate(0deg)",
  },

  [`& .${SidebarToggleButtonClasses.menuButtonIconOpen}`]: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: "rotate(180deg)",
  },
}));

/**
 * A button that toggles the sidebar. Used by default in the <AppBar>.
 * @param props The component props
 * @param {String} props.className An optional class name to apply to the button

 */
type SidebarToggleButtonProps = {
  className?: string;
};

const ToggleSidebar = (props: SidebarToggleButtonProps) => {
  const translate = useTranslate();

  const { className } = props;
  const [open, setOpen] = useSidebarState();

  return (
    <DeviiTooltip
      className={className}
      title={translate(open ? "ra.action.close_menu" : "ra.action.open_menu", {
        _: "Open/Close menu",
      })}
      enterDelay={500}
    >
      <StyledIconButton
        color="inherit"
        onClick={() => setOpen(!open)}
        size="large"
      >
        <MenuIcon
          classes={{
            root: open
              ? SidebarToggleButtonClasses.menuButtonIconOpen
              : SidebarToggleButtonClasses.menuButtonIconClosed,
          }}
        />
      </StyledIconButton>
    </DeviiTooltip>
  );
};

export default ToggleSidebar;
