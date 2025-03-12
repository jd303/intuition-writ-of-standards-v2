import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './features/store';
import { RouteDefinition, routes } from './routes.tsx';

import Home from './app/home/home.tsx'
import WritLayout from './app/layout/writLayout.tsx';

import './index.css'
import RouteListener from './features/routeListener.tsx';

console.trace();

console.time('mainTTL');
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<RouteListener />
				<Routes>
					<Route index path="/" element={<Home />} />
					<Route element={<WritLayout />}>
						{routes.map((route: RouteDefinition) => (
							<Route key={route.path} path={route.path} element={route.element} />
						))}
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	</StrictMode>
)
console.timeEnd('mainTTL');