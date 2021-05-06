import React, { Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../../views/pages/Auth/index";

const Routes = () => {
	return (
		<Switch>
			<Route path="/auth/login" component={Login} />
			<Fragment>
				<Route render={() => <Redirect to="/auth/login" />} />
			</Fragment>
		</Switch>
	);
};

export default Routes;
