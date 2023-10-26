// pages
import Login from "./auth/login";
import Signup from "./auth/signup";
// components
import Main from "./components/user/main";
// style
import "../src/style/index.css"
// routing
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<Main />} />
    </>
  )
);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
