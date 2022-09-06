//Misc
import { useState } from "react";

//Firebase
import {
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

//Components
import FormInput from "../form-input/form-input.comp";
import { Button } from "../button/button.comp";

//Styled Components
import {
  SLink
} from "./login-form.styles";


const defaultFormFields = {
  email: "",
  password: ""
};

const LoginForm = () => {

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
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();
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

      <SLink to="/auth/signup">
        Do not have an account? <span>Create an account</span>
      </SLink>
    </>
  );
};

export default LoginForm;