import React from "react";
import "./LoginPage.css";

import axios from "axios";

import { connect } from "react-redux";

class LoginPage extends React.Component {
	state = {
		email: "",
		password: "",
		loginIsValid: false,
		passIsValid: false,
	};

	getData = () => {
		axios
			.get("https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json")
			.then((response) => {
				localStorage.setItem("backEndData", JSON.stringify(response.data));
			})
			.then(() => {
				this.props.history.push("/dashboard");
			});
	};

	dataValidation = (event, name) => {
		switch (name) {
			case "email":
				this.setState({
					email: event.target.value,
				});
				break;

			case "password":
				this.setState({
					password: event.target.value,
				});
				break;

			default:
				break;
		}
	};

	componentDidMount() {
		if (!localStorage["backendData"]) {
			axios
				.get("https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json")
				.then((response) => {
					localStorage.setItem("backendData", JSON.stringify(response.data));
				});
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();

		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		if (this.state.email.match(emailPattern)) {
			this.setState({ loginIsValid: true });
		} else {
			alert("Please provide correct email address");
		}

		if (this.state.loginIsValid) {
			localStorage.setItem(
				"userData",
				JSON.stringify({
					email: this.state.email,
					password: this.state.password,
				})
			);

			this.props.onUserLoggedIn();

			if (localStorage["backendData"]) {
				this.props.history.push("/dashboard");
			} else {
				this.getData();
			}
		}
	};

	render() {
		return (
			<div className="login-page">
				<form className="login-form" onSubmit={this.handleSubmit}>
					<h2>Welcome to Dashboard, Login</h2>
					<div>
						<span>Username</span>
						<input
							onChange={(e) => {
								this.dataValidation(e, "email");
							}}
							type="email"
							name="email"
							className="username"
							required
						/>
					</div>
					<div>
						<span>Password</span>
						<input
							onChange={(e) => {
								this.dataValidation(e, "password");
							}}
							minLength="8"
							maxLength="20"
							type="password"
							name="password"
							required
						/>
					</div>
					<div>
						<button type="submit">Login</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onUserLoggedIn: () => {
			dispatch({ type: "USER_LOGIN" });
		},
	};
};

export default connect(null, mapDispatchToProps)(LoginPage);
