//Misc

//Components
import FormInput from "../form-input/form-input.comp";

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
        <FormInput label="Email" type="email" name="email" />
        <FormInput label="Username" type="text" name="username" />
        <FormInput label="Password" type="password" name="password" />
        <FormInput label="Confirm Password" type="password" name="confirmPassword" />

        <SButton type="submit">Sign Up</SButton>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;