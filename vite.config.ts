import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Check if we're running vitest
const isTest = process.env.NODE_ENV === 'test';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: 'local.intuitionwritofstandards.com',
		port: 5174,
	},

	...(isTest && {
		test: {
			globals: true,
			environment: "jsdom",
			//setupFiles: "./src/setupTests.ts",
		},
	})
})