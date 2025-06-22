import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import FacebookIcon from "@material-ui/icons/Facebook";
import { faGooglePlusG } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Login() {
	const classes = useStyles();

	const auth = () => {
		console.log("here");
	};

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={8} className={classes.image} />
			<Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Typography component="h1" variant="h5">
						Acesse sua conta
					</Typography>
					<form className={classes.form}>
						<TextField
							variant="outlined"
							margin="normal"
							error={false}
							fullWidth
							label="Digite seu e-mail"
							name="email"
							className={classes.textField}
							autoComplete="email"
							size="small"
						/>
						<TextField
							variant="outlined"
							margin="normal"
							error={false}
							fullWidth
							name="password"
							label="Digite sua senha"
							type="password"
							className={classes.textField}
							autoComplete="current-password"
							size="small"
						/>
						<Button
							type="button"
							fullWidth
							variant="contained"
							className={classes.submit}
							onClick={() => auth()}
						>
							Entrar
						</Button>
						<div style={{ display: "flex", flexDirection: "row" }}>
							<div
								style={{
									height: "1px",
									backgroundColor: "#ccc7c7",
									width: "40%",
								}}
							></div>
							<p
								style={{
									margin: "15px",
									marginTop: "0px",
									position: "relative",
									bottom: "7px",
									color: "#ccc7c7",
								}}
							>
								OU
							</p>
							<div
								style={{
									height: "1px",
									backgroundColor: "#ccc7c7",
									width: "40%",
								}}
							></div>
						</div>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							startIcon={<FacebookIcon />}
							className={classes.facebook}
						>
							Entrar com Facebook
						</Button>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							startIcon={<FontAwesomeIcon icon={["fab", "github"]} />}
							className={classes.google}
						>
							<FontAwesomeIcon
								style={{ position: "relative", right: "11px" }}
								icon={faGooglePlusG}
							/>
							Entrar com Google
						</Button>
						<Box mt={2}>
							<Typography variant="body2" color="textSecondary" align="center">
								{"© "}
								<Link color="inherit" href="#">
									Guilherme Vilela
								</Link>
							</Typography>
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}
