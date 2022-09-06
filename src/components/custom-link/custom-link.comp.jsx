//Styled Components
import {
  NavBarLink,
  defaultButtonLink,
  defaultLink
} from "./custom-link.styles";

export const LINK_TYPE_CLASSES = {
  default: "default",
  defaultButtonLink: "default-button-link",
  navBarLink: "nav-bar-link",
};

const getLink = (linkType = LINK_TYPE_CLASSES.default) => (
  {
    [LINK_TYPE_CLASSES.default]: defaultLink,
    [LINK_TYPE_CLASSES.defaultButtonLink]: defaultButtonLink,
    [LINK_TYPE_CLASSES.navBarLink]: NavBarLink,
  }[linkType]
);

export const CustomLink = ({ children, linkType, ...otherProps }) => {
  const CustomLink = getLink(linkType);

  return (
    <CustomLink {...otherProps}>{children}</CustomLink>
  );
};