//Misc
import { useParams } from "react-router-dom";

//Components
import LoginForm from "../../components/login-form/login-form.comp";
import SignUpForm from "../../components/sign-up-form/sign-up-form.comp";

//Styled Components
import {
  FORM_CONTAINER,
  TITLE
} from "./authentication.styles";
import { CONTENT_CONTAINER } from "../../components/styled/styled.components";

const Authentication = () => {

  const { method } = useParams();

  return (
    <CONTENT_CONTAINER>

      <FORM_CONTAINER>
        {
          method === "login" ? (
            <>
              <TITLE>Login</TITLE>
              <LoginForm />
            </>
          ) : method === "signup" && (
            <>
              <TITLE>Sign Up</TITLE>
              <SignUpForm />
            </>
          )
        }
      </FORM_CONTAINER>
    </CONTENT_CONTAINER>
  );
};

export default Authentication;