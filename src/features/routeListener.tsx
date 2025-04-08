import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAppDispatch } from './firebaseHooks';
import { setTitle, setSubtitle, setSection, setColour } from './ui/uiSlice';
import { RouteDefinition, routes } from '../routes';
import { useAuthState } from './firebase/firebase';

const RouteListener: React.FC = () => {
	const authState = useAuthState();
	const location = useLocation();
	const dispatch = useAppDispatch();
	const [userAuthLevel, setUserAuthLevel] = useState(authState.authLevel);
	const [routeAuthLevel, setRouteAuthLevel] = useState<number>(0);

	// When the location changes, we want to update our uiSlice
	useEffect(() => {
		// Find the route
		const route = findMatchingRoute(routes, location.pathname);
		const parentRoute = routes.find((parentRoute: RouteDefinition) => parentRoute.parentRoute && parentRoute.sectionName == route?.sectionName);

		const routeAuthLevel = route?.authLevel || 0;
		setRouteAuthLevel(routeAuthLevel);
		setUserAuthLevel(authState.authLevel);
		if (userAuthLevel < routeAuthLevel) {
			return;
		}

		if (route) {
			dispatch(setTitle(parentRoute?.label || route.label));
			dispatch(setSubtitle(route.label));
			dispatch(setSection(route.sectionName));
			dispatch(setColour(route.sectionColour));

			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}, [location.pathname, dispatch, routeAuthLevel, userAuthLevel, authState]);

	return userAuthLevel < routeAuthLevel ? <Navigate to="/account" /> : null;
};

const findMatchingRoute = (routes: RouteDefinition[], pathname: string) => {
	let pathSplit = pathname.split('/');
	pathSplit = pathSplit.splice(1);
	return routes.find((route: RouteDefinition) => {
		let routeSplit = route.path.split('/');
		routeSplit = routeSplit.splice(1);
		if (routeSplit.length !== pathSplit.length) return false;

		for (let i = 0; i < routeSplit.length; i++) {
			if (routeSplit[i].includes(":")) continue;
			if (routeSplit[i] != pathSplit[i]) return false;
		}
		
		return true;
	});
}

export default RouteListener;