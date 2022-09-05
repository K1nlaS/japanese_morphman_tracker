//Misc

//Firebase
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

//Components
import FormInput from "../form-input/form-input.comp";

//Styled Components
import {
  LoginContainer,
  Title,
  SButton
} from "./login-form.styles";

const LoginForm = () => {

  const logGoogleUser = async () => {
    const res = await signInWithGooglePopup();
    console.log(res);
  };

  return (
    <LoginContainer>
      <Title>Login</Title>

      <form >
        <FormInput label="Email" type="email" name="email" />
        <FormInput label="Password" type="password" name="password" />

        <SButton type="submit">Login</SButton>

      </form>
      <SButton onClick={logGoogleUser}>Google Sign In</SButton>
    </LoginContainer>
  );
};

export default LoginForm;