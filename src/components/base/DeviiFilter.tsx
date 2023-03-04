import { TextInput, Filter } from "react-admin";

const DeviiFilter = (props: { source: string }) => {
  return (
    <Filter>
      <TextInput label="Search" source={props.source} alwaysOn />
    </Filter>
  );
};

export default DeviiFilter;
