//Styled Components
import {
  DEFAULT_BUTTON,
  PLAIN_BUTTON,
  FORM_DELETE_BUTTOM,
  FORM_ACTION_BUTTON,
} from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
  default: "default",
  plain: "plain",
  formDelete: "form-delete",
  formAction: "form-action",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.default) => (
  {
    [BUTTON_TYPE_CLASSES.default]: DEFAULT_BUTTON,
    [BUTTON_TYPE_CLASSES.plain]: PLAIN_BUTTON,
    [BUTTON_TYPE_CLASSES.formDelete]: FORM_DELETE_BUTTOM,
    [BUTTON_TYPE_CLASSES.formAction]: FORM_ACTION_BUTTON,
  }[buttonType]
);

export const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);

  return (
    <CustomButton {...otherProps}>{children}</CustomButton>
  );
};