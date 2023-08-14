//Misc
import { useSelector } from "react-redux";
import Select from "react-select";
import { selectCurrentUser } from "../../store/user/user.selector";

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

const options = [
  { value: "Title", label: "Title" },
  { value: "Readability", label: "Readability" },
  { value: "Known Instances", label: "Known Instances" },
  { value: "Uknown Morphs", label: "Uknown Morphs" },
  { value: "Last Updated", label: "Last Updated" },
];

const DropDownSort = ({ specificStyles, ...otherProps }) => {

  const { defaultSort } = useSelector(selectCurrentUser);
  const defaultOption = { value: defaultSort, label: defaultSort };

  return (
    <>
      <Select options={options} {...otherProps} defaultValue={defaultOption} styles={{ ...customStyles, ...specificStyles }} />
    </>
  );
};

export default DropDownSort;