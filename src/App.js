//Misc
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

//Routes
import Navigation from "./routes/navigation/navigation.route";
import Home from "./routes/home/home.route";
import Authentication from "./routes/authentication/authentication.route.jsx";
import List from "./routes/list/list.route";

//Firebase
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth
} from "./utils/firebase/firebase.utils";

//Redux
import { setCurrentUser } from "./store/user/user.action";

const App = () => {

  const dispatch = useDispatch();

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
        <Route path="/auth/:method" element={<Authentication />} />
        <Route path="/list" element={<List />} />
      </Route>
    </Routes>
  );
};

export default App;
