import { User } from 'firebase/auth';

// Define the shape of the AuthContext
export interface AuthContextType {
	user: User | null;
	error: Error | null;
}