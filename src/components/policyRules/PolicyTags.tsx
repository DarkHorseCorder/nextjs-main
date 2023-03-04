import React, { useMemo } from "react";
import { Stack, IconButton } from "@mui/material";
import { DeviiChip } from "components/base";

const PolicyTags = ({ record }: any) => {
  const { capabilities, classes, roles, targets, filter } = record;
  const expressions = useMemo(() => {
    if (!filter) return 0;
    const andOccurrence = (filter.match(/AND/gi) || []).length;
    const orOccurence = (filter.match(/OR/gi) || []).length;
    return andOccurrence + orOccurence + 1;
  }, [filter]);
  return (
    <Stack direction="row" spacing={1} justifyContent={"space-around"}>
      <DeviiChip
        label={
          <span>
            Role Classes <IconButton>{classes.length}</IconButton>
          </span>
        }
        disabled={!classes.length}
        color="info"
      />
      <DeviiChip
        label={
          <span>
            Roles <IconButton>{roles.length}</IconButton>
          </span>
        }
        disabled={!roles.length}
        color="success"
      />
      <DeviiChip
        label={
          <span>
            Operations <IconButton>{capabilities.length}</IconButton>
          </span>
        }
        disabled={!capabilities.length}
        color="warning"
      />
      <DeviiChip
        label={
          <span>
            Targets <IconButton>{targets.length}</IconButton>
          </span>
        }
        disabled={!targets.length}
        color="error"
      />
      <DeviiChip
        label={
          <span>
            Expressions <IconButton>{expressions}</IconButton>
          </span>
        }
        disabled={!expressions}
        color="secondary"
      />
    </Stack>
  );
};

export default PolicyTags;
