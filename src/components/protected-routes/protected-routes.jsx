import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

//Selectors
import { selectCurrentUser } from "../../store/user/user.selector";

const ProtectedRoutes = ({ navigatePath, protectedFromUser }) => {

  const currentUser = useSelector(selectCurrentUser);

  if (currentUser) {
    return protectedFromUser ? <Navigate to={navigatePath} /> : <Outlet />;
  } else {
    return <Outlet />;
  }
};

export default ProtectedRoutes;