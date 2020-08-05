import React from "react";
import { BrowserRouter, Route, Switch ,HashRouter } from "react-router-dom";
import Login from "../views/login";
import ShipperRouter from "./ShipperRouter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/global.css";


function ApplicationRouter(porps) {
  toast.configure({
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  return (
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <ShipperRouter />
          <Route
            path="*"
            render={(props) => {
              return <div>ROUTE NOT FOUND</div>;
            }}
          />
        </Switch>
      </HashRouter>
  );
}

export default React.memo(ApplicationRouter);
