//Misc
import { useState } from "react";
import { useDispatch } from "react-redux";

//Redux
import { checkUserSession, emailSignInStart } from "../../store/user/user.action";

//Components
import FormInput from "../form-input/form-input.comp";
import { Button } from "../button/button.comp";

//Styled Components
import {
  SIGNUP_LINK
} from "./login-form.styles";


const defaultFormFields = {
  email: "",
  password: ""
};

const LoginForm = () => {

  const dispatch = useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));

      resetFormFields();
      dispatch(checkUserSession());
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <FormInput label="Email" type="email" name="email" id="email" value={email} onChange={inputChangeHandler} required />
        <FormInput label="Password" type="password" name="password" id="password" value={password} onChange={inputChangeHandler} required />

        <Button type="submit">Login</Button>
      </form>

      <SIGNUP_LINK to="/auth/signup">
        Do not have an account? <span>Create an account</span>
      </SIGNUP_LINK>
    </>
  );
};

export default LoginForm;