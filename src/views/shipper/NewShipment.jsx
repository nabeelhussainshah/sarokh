import React from "react";
import { useHistory, Route, Switch } from "react-router-dom";
import Step1 from "../../components/ShipperComponents/NewShipmentSteps/Step1";
import Step2 from "../../components/ShipperComponents/NewShipmentSteps/Step2";
import Step3 from "../../components/ShipperComponents/NewShipmentSteps/Step3";
import Container from "../../components/Containers/ListingContainer";
import { StateMachineProvider,createStore } from "little-state-machine";
import { DevTool } from 'little-state-machine-devtools';

export default function NewShipment(props) {

    createStore({

    });
  return (
    <Switch>
      <StateMachineProvider>
      {process.env.NODE_ENV !== 'production' && <DevTool />}
        <Container>
          <div className="card-header">
            <h2>NEW Shipment</h2>
          </div>
          <div className="card-body">
            <Route exact path="/shipper/newshipment/step1">
              <Step1 />
            </Route>
            <Route exact path="/shipper/newshipment/step2">
              <Step2 />
            </Route>
            <Route exact path="/shipper/newshipment/step3">
             <Step3 />
            </Route>
          </div>
        </Container>
      </StateMachineProvider>
    </Switch>
  );
}
