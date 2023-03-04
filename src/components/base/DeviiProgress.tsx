/* eslint-disable jsx-a11y/media-has-caption */
import ReactDOM from "react-dom";
import { styled, LinearProgress } from "@mui/material";

const Portal = (Component: any) => (props: any) => {
  return ReactDOM.createPortal(
    <Component {...props} />,
    document.getElementById("myportal")
  );
};

const StyledProgress = styled(LinearProgress)({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  zIndex: 1000,
});

const DeviiProgress = Portal(StyledProgress);

export default DeviiProgress;
