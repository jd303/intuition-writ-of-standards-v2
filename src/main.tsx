import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './features/store';
import { AuthContextProvider } from './features/firebase/firebaseAuthContext.tsx';
import { App } from './app/app.tsx';
import './index.css'

console.trace();

console.time('mainTTL');
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthContextProvider>
			<Provider store={store}>
				<App></App>
			</Provider>
		</AuthContextProvider>
	</StrictMode>
)
console.timeEnd('mainTTL');