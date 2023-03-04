import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Box } from "@mui/material";
import { TextInput, useListContext } from "react-admin";
import DeviiFilterButton from "./DeviiFilterButton";

const DeviiPostFilterForm = (props: { filters: any }) => {
  const { filterValues, setFilters, hideFilter } = useListContext();

  const form = useForm({
    defaultValues: filterValues,
  });

  const onChange = (e: any) => {
    if (e === "") {
      setFilters("", []);
    }
  };

  const onSubmit = (values: any): void => {
    if (Object.keys(values).length > 0) {
      setFilters(values, []);
    } else {
      hideFilter("main");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box display="flex" alignItems="flex-end" mt={5} ml={2}>
          <Box component="span" mr={2}>
            <TextInput
              resettable
              helperText={false}
              source={props.filters.main}
              label="Search"
              onChange={onChange}
              alwaysOn
            />
            <DeviiFilterButton />
          </Box>
        </Box>
      </form>
    </FormProvider>
  );
};

export default DeviiPostFilterForm;
