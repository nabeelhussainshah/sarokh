import React from 'react';
import { useHistory, Route, Switch } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Step1 from '../../components/ShipperComponents/ShipperSignupSteps/Step1';
import Step2 from '../../components/ShipperComponents/ShipperSignupSteps/Step2';
import Step3 from "../../components/ShipperComponents/ShipperSignupSteps/Step3";
import Step4 from "../../components/ShipperComponents/ShipperSignupSteps/Step4";

export default function ShipperSignup(props) {
	return (
		<RecoilRoot>
            <Switch>
			<Route exact path="/shipper/signup/step1">
				<Step1 />
			</Route>
			<Route exact path="/shipper/signup/step2">
				<Step2 />
			</Route>
            <Route exact path="/shipper/signup/step3">
				<Step3 />
			</Route>
            <Route exact path="/shipper/signup/step4">
				<Step4 />
			</Route>
            </Switch>
		</RecoilRoot>
	);
}
