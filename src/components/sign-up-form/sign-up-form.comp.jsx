//Misc
import { useState } from "react";
import { useDispatch } from "react-redux";

//Components
import FormInput from "../form-input/form-input.comp";
import { Button } from "../button/button.comp";

//Redux
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
  email: "",
  username: "",
  password: "",
  confirmPassword: ""
};

const SignUpForm = () => {

  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, username, password, confirmPassword } = formFields;

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
    }

    try {
      dispatch(signUpStart(email, password, username));

      resetFormFields();
    } catch (error) {
      console.log(error.code);
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <FormInput label="Email" type="email" name="email" id="email" value={email} onChange={inputChangeHandler} required />
        <FormInput label="Username" type="text" name="username" id="username" value={username} onChange={inputChangeHandler} required />
        <FormInput label="Password" type="password" name="password" id="password" value={password} onChange={inputChangeHandler} required />
        <FormInput label="Confirm Password" type="password" id="confirmPassword" value={confirmPassword} name="confirmPassword" onChange={inputChangeHandler} required />

        <Button type="submit">Create Account</Button>
      </form>
    </>
  );
};

export default SignUpForm;