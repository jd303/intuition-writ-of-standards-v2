import { Link } from "react-router";
import { useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../features/hooks";
import { RootState } from "../../features/store";
import { setMenu } from "../../features/ui/uiSlice";
import { RouteDefinition, routes } from "../../routes";
import IntuitionLogo from "../components/intuition-logo/intuition-logo";

import st from './PageBanner.module.css';

function PageBanner() {
	const dispatch = useAppDispatch();

	const colour = useAppSelector((state: RootState) => state.ui.colour);
	const title = useAppSelector((state: RootState) => state.ui.title);
	const subTitle = useAppSelector((state: RootState) => state.ui.subtitle);
	const menuOpen = useAppSelector((state: RootState) => state.ui.menuOpen);
	const currentSection = useAppSelector((state: RootState) => state.ui.section);

	const displayTitle = useMemo(() => {
		return (title == subTitle) && title || `${title} - ${subTitle}`;
	}, [title, subTitle]);

	const menu = useMemo(() => {
		return routes.map((route: RouteDefinition, index: number) => {
			if (route.parentRoute) {
				return <Link key={route.label + index} to={route.path} className="trattatello">{route.label}</Link>
			}
		});
	}, []);

	return (
		<>
			<div className={[st.pageBanner, "trattatello", st[`banner-${colour}`]].join(' ')} onClick={() => dispatch(setMenu(!menuOpen))}>
				<div className={st.pageTitle}>
					<div className={st.logo}><IntuitionLogo /></div>
					{displayTitle}
				</div>

				<div>
					<button className={st.hamburger}>
						<div className={[st.notch, st.one].join(' ')}></div>
						<div className={[st.notch, st.two].join(' ')}></div>
						<div className={[st.notch, st.three].join(' ')}></div>
					</button>
				</div>
			</div>
			<div className={[st.outerTapper, (menuOpen ? st.open : st.closed)].join(' ')} onClick={() => dispatch(setMenu(false))}></div>
			<nav className={[st.main, (menuOpen ? st.open : st.closed)].join(' ')} onClick={() => dispatch(setMenu(false))}>
				{menu}
			</nav>
			<nav className={[st.secondary, st[`banner-${colour}`]].join(' ')}>
				{routes.filter((route: RouteDefinition) => route.sectionName == currentSection && currentSection && !route.parentRoute).map((route: RouteDefinition, index: number) => (
					<Link key={route.label + index} to={route.path} className="trattatello">{route.label}</Link>
				))}
			</nav>
		</>
	)
}

export default PageBanner;
