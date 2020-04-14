import React from "react";
import "./App.css";

import LoginPage from "./Components/LoginPage/LoginPage";
import Header from "./Components/Layout/Header/Header";
import Footer from "./Components/Layout/Footer/Footer";
import DashboardPage from "./Components/DashboardPage/DashboardPage";
import ProductPage from "./Components/ProductContainer/ProductPage";
import AddProductPage from "./Components/ProductContainer/ProductPage/ProductBlock/AddProductPage/AddProductPage";
import AccountsPage from "./Components/AccountsPage/AccountsPage";

import { Switch, BrowserRouter, Route, Redirect } from "react-router-dom";

import { connect } from "react-redux";

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Header />

					<main>
						<Switch>
							<Route
								exact
								path="/"
								render={() =>
									this.props.userLoggedInStatus ? (
										<Redirect to="/dashboard" />
									) : (
										<Redirect to="/login" />
									)
								}
							/>

							<Route
								exact
								path="/login"
								render={(props) =>
									!this.props.userLoggedInStatus ? (
										<LoginPage {...props} />
									) : (
										<Redirect to="/dashboard" />
									)
								}
							/>

							<Route
								exact
								path="/dashboard"
								render={(props) =>
									this.props.userLoggedInStatus ? (
										<DashboardPage {...props} />
									) : (
										<Redirect to="/login" />
									)
								}
							/>

							<Route
								exact
								path="/products"
								render={(props) =>
									this.props.userLoggedInStatus ? (
										<ProductPage {...props} />
									) : (
										<Redirect to="/login" />
									)
								}
							/>

							<Route
								exact
								path="/products/add"
								render={(props) =>
									this.props.userLoggedInStatus ? (
										<AddProductPage {...props} />
									) : (
										<Redirect to="/login" />
									)
								}
							/>

							<Route
								exact
								path="/accounts"
								render={(props) =>
									this.props.userLoggedInStatus ? (
										<AccountsPage {...props} />
									) : (
										<Redirect to="/login" />
									)
								}
							/>
						</Switch>
					</main>

					<Footer />
				</div>
			</BrowserRouter>
		);
	}
}

const mapGlobalStateToProps = (globalState) => {
	return {
		userLoggedInStatus: globalState.loggedInStatus,
	};
};

export default connect(mapGlobalStateToProps)(App);
