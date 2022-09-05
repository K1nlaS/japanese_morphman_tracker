//Misc
import { Route, Routes } from "react-router-dom";

//Routes
import Navigation from "./routes/navigation/navigation.route";
import Home from "./routes/home/home.route";
import Authentication from "./routes/authentication/authentication.route.jsx";


const App = () => {


  return (
    <Routes>
      <Route path="/" element={<Navigation />} >
        <Route index element={<Home />} />
        <Route path="/auth/:method" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
