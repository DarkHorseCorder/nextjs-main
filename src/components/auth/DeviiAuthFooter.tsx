import * as React from "react";
import { Box, Stack, Link } from "@mui/material";

const style = {
  fontSize: "1.125rem",
  fontWeight: 400,
  color: "text.secondary",
};

const DeviiAuthFooter = () => {
  return (
    <Box
      sx={{
        marginTop: 8,
        paddingBottom: 2,
        position: "fixed",
        left: 0,
        right: 0,
        display: "block",
        bottom: "13px",
        margin: "auto",
        width: {
          xs: 300, // theme.breakpoints.up('xs')
          sm: 450, // theme.breakpoints.up('sm')
          md: 500, // theme.breakpoints.up('md')
          lg: 600, // theme.breakpoints.up('lg')
          xl: 600, // theme.breakpoints.up('xl')
        },
      }}
    >
      <Stack direction="row" spacing={6} sx={{ justifyContent: "center" }}>
        <Link href="#" sx={style}>
          Help
        </Link>
        <Link href="#" sx={style}>
          Privacy
        </Link>
        <Link href="#" sx={style}>
          Terms
        </Link>
      </Stack>
    </Box>
  );
};

export default DeviiAuthFooter;
