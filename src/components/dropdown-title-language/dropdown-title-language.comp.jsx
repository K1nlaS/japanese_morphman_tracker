//Misc
import { useSelector } from "react-redux";
import Select from "react-select";
import { selectSettings } from "../../store/user/user.selector";


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
    backgroundColor: "var(--default-body-color)",
    borderRadius: "var(--border-radius)",
  })
};

const options = [
  { value: "Romaji", label: "Romaji" },
  { value: "Native", label: "Native" },
  { value: "English", label: "English" },
];

const DropDownTitleLanguage = ({ ...otherProps }) => {

  const { titleLanguage } = useSelector(selectSettings);
  const defaultOption = { value: titleLanguage, label: titleLanguage };

  return (
    <>
      <Select options={options} {...otherProps} defaultValue={defaultOption} styles={customStyles} />
    </>
  );
};

export default DropDownTitleLanguage;