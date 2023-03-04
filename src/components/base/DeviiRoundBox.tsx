import { styled } from "@mui/material/styles";
import MuiBox from "@mui/material/Box";
import { BoxProps } from "@mui/system";

type DeviiRoundBoxProps = BoxProps & {
  roundish?: boolean;
};

const DeviiRoundBox: any = styled(MuiBox)<DeviiRoundBoxProps>(
  ({ theme }) =>
    (props) => ({
      borderRadius: props.roundish
        ? theme.shape.borderRadius * 5
        : theme.shape.borderRadius * 1.5,
      backgroundColor: theme.palette.background.light,
      padding: theme.spacing(1, 2),
    })
);

export default DeviiRoundBox;
