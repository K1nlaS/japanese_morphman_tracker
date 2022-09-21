//Misc
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Routes
import Navigation from "./routes/navigation/navigation.route";
import Home from "./routes/home/home.route";
import Authentication from "./routes/authentication/authentication.route.jsx";
import Settings from "./routes/settings/settings.route";

//Components
import ProtectedRoute from "./components/protected-route/protected-route.comp";
import SettingsLists from "./components/settings-lists/settings-lists.comp";
import SettingsAccount from "./components/settings-account/settings-account.comp";

//Firebase
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";

//Redux
import { fetchSettingsAsync, setCurrentUser } from "./store/user/user.action";
import { selectCurrentUser } from "./store/user/user.selector";

const App = () => {

  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchSettingsAsync(currentUser));
  }, [dispatch, currentUser]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />} >

        <Route path="/home" element={<Home />} >
          <Route path="/home/:status" element={<Home />} />
        </Route>

        <Route path="/auth/:method" element={<Authentication />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/settings" element={<Settings />} >
            <Route index element={<SettingsAccount />} />
            <Route path="/settings/lists" element={<SettingsLists />} />
          </Route>
        </Route>

      </Route>
    </Routes>
  );
};

export default App;
