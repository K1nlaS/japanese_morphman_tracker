//Styled Components
import {
  NAV_BAR_LINK,
  DEFAULT_BUTTON_LINK,
  DEFAULT_LINK,
} from "./custom-link.styles";

export const LINK_TYPE_CLASSES = {
  default: "default",
  defaultButtonLink: "default-button-link",
  navBarLink: "nav-bar-link",
  externalLink: "external"
};

const getLink = (linkType = LINK_TYPE_CLASSES.default) => (
  {
    [LINK_TYPE_CLASSES.default]: DEFAULT_LINK,
    [LINK_TYPE_CLASSES.defaultButtonLink]: DEFAULT_BUTTON_LINK,
    [LINK_TYPE_CLASSES.navBarLink]: NAV_BAR_LINK,
  }[linkType]
);

export const CustomLink = ({ children, linkType, ...otherProps }) => {
  const CustomLink = getLink(linkType);

  return (
    <CustomLink {...otherProps}>{children}</CustomLink>
  );
};