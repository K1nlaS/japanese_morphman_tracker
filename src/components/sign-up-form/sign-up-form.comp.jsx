//Misc
import { useState } from "react";

//Components
import FormInput from "../form-input/form-input.comp";

//Firebase
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

//Styled Components
import {
  SignUpContainer,
  Title,
  SButton
} from "./sign-up-form.styles";


const defaultFormFields = {
  email: "",
  username: "",
  password: "",
  confirmPassword: ""
};

const SignUpForm = () => {

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
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, { username });

      resetFormFields();
    } catch (error) {
      console.log(error.code);
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <SignUpContainer>
      <Title>Sign Up</Title>

      <form onSubmit={formSubmitHandler}>
        <FormInput label="Email" type="email" name="email" id="email" value={email} onChange={inputChangeHandler} required />
        <FormInput label="Username" type="text" name="username" id="username" value={username} onChange={inputChangeHandler} required />
        <FormInput label="Password" type="password" name="password" id="password" value={password} onChange={inputChangeHandler} required />
        <FormInput label="Confirm Password" type="password" id="confirmPassword" value={confirmPassword} name="confirmPassword" onChange={inputChangeHandler} required />

        <SButton type="submit">Sign Up</SButton>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;