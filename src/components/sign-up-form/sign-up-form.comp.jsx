//Misc

//Components
import { useRef } from "react";
import FormInput from "../form-input/form-input.comp";

//Contexts


//Styled Components
import {
  SignUpContainer,
  Title,
  SButton
} from "./sign-up-form.styles";


const SignUpForm = () => {

  return (
    <SignUpContainer>
      <Title>Sign Up</Title>

      <form >
        <FormInput label="Email" type="email" name="email" required />
        <FormInput label="Username" type="text" name="username" required />
        <FormInput label="Password" type="password" name="password" required />
        <FormInput label="Confirm Password" type="password" name="confirmPassword" required />

        <SButton type="submit">Sign Up</SButton>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;