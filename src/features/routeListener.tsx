import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAppDispatch } from './hooks';
import { setTitle, setSubtitle, setSection, setColour } from './ui/uiSlice';
import { RouteDefinition, routes } from '../routes';

const RouteListener: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  // When the location changes, we want to update our uiSlice
  useEffect(() => {
	// Find the route
	const route = routes.find((route: RouteDefinition) => route.path == location.pathname);
	const parentRoute = routes.find((parentRoute: RouteDefinition) => parentRoute.parentRoute && parentRoute.sectionName == route?.sectionName);

	if (route) {
		dispatch(setTitle(parentRoute?.label || route.label));
		dispatch(setSubtitle(route.label));
		dispatch(setSection(route.sectionName));
		dispatch(setColour(route.sectionColour));
	}
  }, [location.pathname, dispatch]);

  return null; // This component doesn't render anything
};

export default RouteListener;