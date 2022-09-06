//Styled Components
import {
  defaultButton,
} from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  default: "default",
};

const getButton = (buttonStyle = BUTTON_TYPE_CLASSES.default) => (
  {
    [BUTTON_TYPE_CLASSES.default]: defaultButton,
  }[buttonStyle]
);

export const Button = ({ children, buttonStyle, ...otherProps }) => {
  const CustomButton = getButton(buttonStyle);

  return (
    <CustomButton {...otherProps}>{children}</CustomButton>
  );
};