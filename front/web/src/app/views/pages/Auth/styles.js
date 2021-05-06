import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: {
		height: "100vh",
	},
	image: {
		backgroundImage: "url(/img/5522.jpg)",
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	paper: {
		margin: theme.spacing(20, 8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 5),
		backgroundColor: "#39a79f",
		color: "#fff",
		textTransform: "none",
		"&:hover": {
			backgroundColor: "#1e716b",
		},
	},
	facebook: {
		color: "#fff",
		backgroundColor: "#3a5696",
		textTransform: "none",
		"&:hover": {
			backgroundColor: "#16306c",
		},
	},
	google: {
		backgroundColor: "#ed3739",
		color: "#fff",
		margin: theme.spacing(1, 0, 0),
		textTransform: "none",
		"&:hover": {
			backgroundColor: "#d91c1e",
		},
	},
	textField: {
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: "#39a79f",
		},
		"& .MuiInputLabel-outlined.Mui-focused": {
			color: "#39a79f",
		},
	},
}));
