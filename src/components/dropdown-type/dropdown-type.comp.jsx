//Misc
import Select from "react-select";

//Styled Components


//Select Styles
const customStyles = {
  container: (styles) => ({
    ...styles,
    width: "100%",
  }),

  control: (styles) => ({
    ...styles,
    backgroundColor: "var(--primary-white-color)",
    border: "none",
    height: "2rem",
    borderRadius: "var(--border-radius)",
    fontSize: "1.4rem",
  }),

  placeholder: (styles) => ({
    ...styles,
    color: "var(--text-color)"
  }),

  singleValue: (styles) => ({
    ...styles,
    color: "var(--text-color)",
  }),

  option: (styles, state) => ({
    ...styles,
    borderRadius: "var(--border-radius)",
    margingBotton: "1rem",
    transiton: ".3s",
    cursor: "pointer",
    fontSize: "1.4rem",

    '&:hover': {
      backgroundColor: 'var(--primary-button-color)',
      color: "white"
    },

    backgroundColor: state.isFocused & 'var(--primary-button-color)'
  }),

  menu: (styles) => ({
    ...styles,
    backgroundColor: "var(--primary-white-color)",
    borderRadius: "var(--border-radius)",
  })
};

const DropDownType = ({ options, ...otherProps }) => {

  return (
    <>
      <Select options={options} {...otherProps} styles={customStyles} />
    </>
  );
};

export default DropDownType;