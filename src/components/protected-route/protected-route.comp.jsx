//Misc
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectCurrentUser } from "../../store/user/user.selector";

const ProtectedRoute = ({ children, ...rest }) => {

  const currentUser = useSelector(selectCurrentUser);

  return (
    currentUser ? <Outlet /> : <Navigate to={"/auth/login"} />
  );
};

export default ProtectedRoute;