import { Routes, Route, useNavigate } from "react-router-dom";
// pages
import Home from "../pages/home";
import AddBook from "../pages/addBook";
import UserBooks from "../pages/UserBooks";
import Reserved from "../pages/reserved";
// components
import NotFound from "./notFound";
import Nav from "./nav";
//react
import { useEffect } from "react";

const Main = () => {
  //  protecting routes
  const navigate = useNavigate();
  useEffect(() => {
    if (!document.cookie) {
      navigate("/login");
    }
  }, []);
  
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Nav />
              <Home />
            </>
          }
        ></Route>
        <Route
          path="/add"
          element={
            <>
              <Nav />
              <AddBook />
            </>
          }
        ></Route>
        <Route
          path="/user-books"
          element={
            <>
              <Nav />
              <UserBooks />
            </>
          }
        ></Route>
        <Route
          path="/reserved-books"
          element={
            <>
              <Nav />
              <Reserved />
            </>
          }
        ></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Main;
