//Misc
import Select from "react-select";

//Select Styles
const customStyles = {
  container: (styles) => ({
    ...styles,
    width: "100%",
  }),

  control: (styles) => ({
    ...styles,
    backgroundColor: "var(--default-body-color)",
    border: "none",
    borderRadius: "var(--border-radius)",
  }),

  singleValue: (styles) => ({
    ...styles,
    color: "var(--text-color)"
  }),

  option: (styles) => ({
    ...styles,
    borderRadius: "var(--border-radius)",
    margingBotton: "1rem",
    transiton: ".3s",

    '&:hover': {
      backgroundColor: 'var(--primary-button-color)',
      color: "white"
    }
  }),

  menu: (styles) => ({
    ...styles,
    backgroundColor: "var(--default-body-color)",
    borderRadius: "var(--border-radius)",
  })
};

const DropDown = ({ options, ...otherProps }) => {

  return (
    <Select options={options} {...otherProps} defaultValue={options[0]} styles={customStyles} />
  );
};

export default DropDown;