import { Outlet } from "react-router";
import PageBanner from "../pageBanner/pageBanner";
import Footer from "../components/footer/footer";

import './writLayout.css';

function WritLayout() {
	return (
		<>
			<PageBanner />
			<div className="page-container">
				<div className="page-content"><Outlet /></div>
				<Footer />
			</div>
		</>
	)
}

export default WritLayout;
