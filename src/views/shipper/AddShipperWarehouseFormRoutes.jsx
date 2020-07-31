import React from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Step1 from "../../components/ShipperComponents/AddShipperWarehouse/Step1";
import Step2 from "../../components/ShipperComponents/AddShipperWarehouse/Step2";
import Step3 from "../../components/ShipperComponents/AddShipperWarehouse/Step3";
import OurLocation from "../../views/shipper/OurLocation";

export default function AddShipperWarehouseFormRoutes(props)
{
    return (
		<RecoilRoot>
            <Switch>
			<Route exact path="/shipper/addshipperwarehouse/ourlocation">
				<OurLocation />
			</Route>
			<Route exact path="/shipper/addshipperwarehouse/step1">
				<Step1 />
			</Route>
			<Route exact path="/shipper/addshipperwarehouse/step2">
				<Step2 />
			</Route>
            <Route exact path="/shipper/addshipperwarehouse/step3">
				<Step3 />
			</Route>
            </Switch>
		</RecoilRoot>
	);
}