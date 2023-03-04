import { Button } from "@mui/material";
import ContentFilter from "@mui/icons-material/FilterList";
import DeviiTooltip from "./DeviiTooltip";

const DeviiFilterButton = () => {
  return (
    <DeviiTooltip title="Filter">
      <Button
        type="submit"
        size="small"
        color="primary"
        startIcon={<ContentFilter />}
        sx={{
          borderRadius: "50%",
          color: "action.active",
          padding: "12px 0",
          minWidth: 50,
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      />
    </DeviiTooltip>
  );
};

export default DeviiFilterButton;
