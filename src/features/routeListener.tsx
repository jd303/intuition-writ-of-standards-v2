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
		const route = routes.find((route: RouteDefinition) => route.path == location.pathname);
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
		}
	}, [location.pathname, dispatch, routeAuthLevel, userAuthLevel, authState]);

	return userAuthLevel < routeAuthLevel ? <Navigate to="/account" /> : null;
};

export default RouteListener;