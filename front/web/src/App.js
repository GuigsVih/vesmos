import React from "react";
import "./assets/css/app.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./app/core/routes/Routes";
import history from "./app/core/routes/history";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

function App() {
	const theme = createMuiTheme({
		typography: {
			fontFamily: `"Titillium Web", sans-serif !important`,
			fontSize: 14,
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter history={history}>
				<Routes />
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
