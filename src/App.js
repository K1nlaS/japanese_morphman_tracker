//Misc
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

//Routes
import Navigation from "./routes/navigation/navigation.route";
import Home from "./routes/home/home.route";
import Authentication from "./routes/authentication/authentication.route.jsx";

//Components
import ProtectedRoutes from "./components/protected-routes/protected-routes";

//Firebase
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth
} from "./utils/firebase/firebase.utils";

//Seeder
import { seed } from "./utils/seeder/seeder";

//Redux
import { setCurrentUser } from "./store/user/user.action";

const App = () => {

  const dispatch = useDispatch();

  // Seeder Function
  // useEffect(() => {
  //   seed();
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Home />} />
        <Route element={<ProtectedRoutes protectedFromUser={true} navigatePath={"/"} />} >
          <Route path="/auth/:method" element={<Authentication />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
