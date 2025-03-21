import { Outlet } from "react-router";
import { ReactNode } from "react";
import PageBanner from "../pageBanner/pageBanner";
import Footer from "../components/footer/footer";

import st from './writLayout.module.css';

interface WritLayoutProps {
	children?: ReactNode;
}

function WritLayout({ children }: WritLayoutProps) {
	return (
		<>
			<PageBanner />
			<div className={st.pageContainer}>
				<div className={st.pageContent}>{ children || <Outlet /> }</div>
				<Footer />
			</div>
		</>
	)
}

export default WritLayout;
