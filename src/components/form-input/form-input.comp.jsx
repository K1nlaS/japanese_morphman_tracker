//Misc

//Styled Components
import {
  Group,
  FormInputLabel,
  Input
} from "./form-input.styles";

const FormInput = ({ label, id, ...otherProps }) => {
  return (
    <Group>
      {label && <FormInputLabel htmlFor={id}>{label}</FormInputLabel>}
      <Input {...otherProps} id={id} />
    </Group>
  );
};

export default FormInput;