//Misc

//Styled Components
import {
  Group,
  FormInputLabel,
  Input
} from "./form-input.styles";

function FormInput({ label, ...otherProps }) {
  return (
    <Group>
      <FormInputLabel>{label}</FormInputLabel>
      <Input {...otherProps} />
    </Group>
  );
}

export default FormInput;