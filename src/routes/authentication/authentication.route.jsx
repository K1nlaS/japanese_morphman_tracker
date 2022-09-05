//Misc
import { Route, useParams } from "react-router-dom";

//Components
import LoginForm from "../../components/login-form/login-form.comp";
import SignUpForm from "../../components/sign-up-form/sign-up-form.comp";

//Styled Components
import { ContentContainer } from "../home/home.styles";

const Authentication = () => {

  const { method } = useParams();

  return (
    <ContentContainer>

      {
        method === "login" ? (<LoginForm />)
          : method === "signup" && (<SignUpForm />)
      }

    </ContentContainer>
  );
};

export default Authentication;