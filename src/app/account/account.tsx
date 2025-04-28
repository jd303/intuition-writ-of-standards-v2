import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import st from './account.module.css';
import ConfirmButton from "../components/confirmButton/confirmButton";

function Account() {
	const navigate = useNavigate();

	// Initial Auth Check
	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setLoggedIn(true);
				setLoggedInUserEmail(user.email);
			} else {
				setLoggedIn(false);
				setLoggedInUserEmail('');
			}
		});
	}, []);

	// Form State
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [loginError, setLoginError] = useState<string>('');
	const [loggedInUserEmail, setLoggedInUserEmail] = useState<string | null>(null);
	const [registerResult, setRegisterResult] = useState<string>('');
	const [registerError, setRegisterError] = useState<string>('');
	const [loginEmailInput, setLoginEmailInput] = useState<string>('');
	const onChangeLoginEmail = (event: React.ChangeEvent<HTMLInputElement>) => setLoginEmailInput(event.target.value);
	const [loginPasswordInput, setLoginPasswordInput] = useState<string>('');
	const onChangeLoginPassword = (event: React.ChangeEvent<HTMLInputElement>) => setLoginPasswordInput(event.target.value);
	const [registerEmailInput, setRegisterEmailInput] = useState<string>('');
	const onChangeRegisterEmail = (event: React.ChangeEvent<HTMLInputElement>) => setRegisterEmailInput(event.target.value);
	const [registerPasswordInput, setRegisterPasswordInput] = useState<string>('');
	const onChangeRegisterPassword = (event: React.ChangeEvent<HTMLInputElement>) => setRegisterPasswordInput(event.target.value);

	// User Actions
	const login = () => {
		setLoginError('');
		const auth = getAuth();

		signInWithEmailAndPassword(auth, loginEmailInput, loginPasswordInput)
			.catch((error) => {
				const errorMessage = error.message;
				setLoginError(errorMessage);
			});
	}

	const forgotPassword = () => {
		const auth = getAuth();
		if (!loginEmailInput.length) return setLoginError("Please enter your account email.");
		sendPasswordResetEmail(auth, loginEmailInput)
			.then(() => {
				setLoginError("You have been sent an email to continue resetting your password.");
			})
			.catch((error) => {
				setLoginError(error.message);
			});
	}

	const logout = () => {
		const auth = getAuth();
		auth.signOut().then(() => { });
	}

	const register = () => {
		setRegisterError('');
		setRegisterResult('');

		const auth = getAuth();
		createUserWithEmailAndPassword(auth, registerEmailInput, registerPasswordInput)
			.then((userCredential) => {
				const user = userCredential.user;
				setRegisterResult(`User with email ${user.email} registered.`);
			})
			.catch((error) => {
				const errorMessage = error.message;
				setRegisterError(errorMessage);
			});
	}

	const goToCharacters = () => navigate('/characters');

	return (
		<div className={st.signingForm}>
			<hr />
			{loggedIn && (
				<div className={st.form}>
					<div className={st.heading + " trattatello"}>Account</div>
					<div>You are logged in as {loggedInUserEmail}.</div>
					<div>&nbsp;</div>
					<ConfirmButton onClick={logout} label="Logout"></ConfirmButton>
					<hr />
					<div className={st.heading + " trattatello"}>Intuition</div>
					<p>Intuition is a Point-buy system that gives you the freedom to create a character your way. Instead of using pre-defined classes, each character can invest points in whichever Skills or Expertises they choose, designing the perfect character for them.</p>
					<div className={st.heading + " trattatello"}>Characters</div>
					<p>View and manage your characters.</p>
					<button onClick={goToCharacters}>Characters Page</button>
				</div>
			)}
			{!loggedIn && (
				<>
					<div className={st.form}>
						<div className={st.heading + " trattatello"}>Welcome</div>
						<p>Login, or create an account to build and manage your Intuition Characters.</p>
					</div>
					<div className={st.form}>
						<div className={st.heading + " trattatello"}>Login</div>
						<input type="text" name="email" placeholder="Email" value={loginEmailInput} onChange={onChangeLoginEmail} />
						<input type="password" name="password" placeholder="Password" value={loginPasswordInput} onChange={onChangeLoginPassword} />
						<button type="button" onClick={login}>Login</button>
						<button type="button" onClick={forgotPassword}>Forgot Password?</button>
						<div className={st.error}>{loginError}</div>
					</div>
					<div className={st.form}>
						<div className={st.heading + " trattatello"}>Register</div>
						<input type="text" name="email" placeholder="Email" value={registerEmailInput} onChange={onChangeRegisterEmail} />
						<input type="password" name="password" placeholder="Password" value={registerPasswordInput} onChange={onChangeRegisterPassword} />
						<button type="button" onClick={register}>Register</button>
						<div className={st.error}>{registerError || registerResult}</div>
					</div>
				</>
			)}
			<hr />
		</div>
	)
}

export default Account
