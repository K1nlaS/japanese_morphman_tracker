//Misc
import Select from "react-select";

//Styled Components
import { GROUP, FORM_INPUT_LABEL } from "./dropdown.styles";

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
    height: "4rem",
    borderRadius: "var(--border-radius)",
  }),

  singleValue: (styles) => ({
    ...styles,
    color: "var(--text-color)"
  }),

  option: (styles, state) => ({
    ...styles,
    borderRadius: "var(--border-radius)",
    margingBotton: "1rem",
    transiton: ".3s",
    cursor: "pointer",

    '&:hover': {
      backgroundColor: 'var(--primary-button-color)',
      color: "white"
    },

    backgroundColor: state.isFocused & 'var(--primary-button-color)'
  }),

  menu: (styles) => ({
    ...styles,
    backgroundColor: "var(--default-body-color)",
    borderRadius: "var(--border-radius)",
  })
};

const DropDown = ({ label, statusValue, options, ...otherProps }) => {

  let optionSet = options;
  if (statusValue) {
    optionSet = options.filter(option => option.value === statusValue);
  }

  return (
    <GROUP>
      {label && <FORM_INPUT_LABEL >{label}</FORM_INPUT_LABEL>}

      {
        statusValue ? (<Select options={options} {...otherProps} value={optionSet[0]} styles={customStyles} />)
          : (<Select options={options} {...otherProps} defaultValue={optionSet[0]} styles={customStyles} />)
      }

    </GROUP>
  );
};

export default DropDown;