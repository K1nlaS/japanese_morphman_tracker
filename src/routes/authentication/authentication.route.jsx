//Misc
import { Route, useParams } from "react-router-dom";

//Components
import LoginForm from "../../components/login-form/login-form.comp";
import SignUpForm from "../../components/sign-up-form/sign-up-form.comp";

//Styled Components
import {
  FormContainer,
  Title
} from "./authentication.styles";
import { ContentContainer } from "../home/home.styles";

const Authentication = () => {

  const { method } = useParams();

  return (
    <ContentContainer>

      <FormContainer>
        {
          method === "login" ? (
            <>
              <Title>Login</Title>
              <LoginForm />
            </>
          ) : method === "signup" && (
            <>
              <Title>Sign Up</Title>
              <SignUpForm />
            </>
          )
        }
      </FormContainer>
    </ContentContainer>
  );
};

export default Authentication;