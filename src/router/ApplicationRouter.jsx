import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "../views/login";
import ShipperRouter from "./ShipperRouter";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/global.css";

function ApplicationRouter(porps) {
    toast.configure({
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>

      <ShipperRouter />
      <Route
          render={(props) => {
            return <div>ROUTE NOT FOUND</div>;
          }}
        />
   </Switch>
    </BrowserRouter>
  );
}

export default React.memo(ApplicationRouter);
