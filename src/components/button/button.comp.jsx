//Styled Components
import {
  defaultButton,
} from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  default: "default",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.default) => (
  {
    [BUTTON_TYPE_CLASSES.default]: defaultButton,
  }[buttonType]
);

export const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);

  return (
    <CustomButton {...otherProps}>{children}</CustomButton>
  );
};