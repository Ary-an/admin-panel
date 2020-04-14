import React from "react";
import "./DashboardPage.css";

import LatestHits from "./Charts/LatestHits";
import Perform from "./Charts/Performance";
import Storage from "./Charts/Storage";
import Notifications from "../../Components/DashboardPage/Notifications/Notifications";
import OrderList from "./OrderList/OrderList";

class Dashboard extends React.Component {
	render() {
		return (
			<div className="dashboard container">
				<p className="greeting">
					Welcome back, <b>{JSON.parse(localStorage["userData"]).userName}</b>
				</p>

				<div className="charts">
					<LatestHits />
					<Perform />
					<Storage />
					<Notifications />
					<OrderList />
				</div>
			</div>
		);
	}
}

export default Dashboard;
