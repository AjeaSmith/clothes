import { useState } from 'react';
import {
	signInWithGoogle,
	createUserDocumentFromAuth,
	signInUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../../components/button/button.component';
import './sign-in.styles.scss';

const defaultFormFields = {
	email: '',
	password: '',
};
const SignIn = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const [errorMessage, setErrorMessage] = useState('');
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const loginWithGoogle = async () => {
		const { user } = await signInWithGoogle();
		await createUserDocumentFromAuth(user);
		resetFormFields();
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signInUserWithEmailAndPassword(email, password);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/user-not-found':
					setErrorMessage(
						'No user associated with that email, try sigining up.'
					);
					break;
				case 'auth/wrong-password':
					setErrorMessage('Wrong email or password.');
					break;
				default:
					setErrorMessage(
						'There was an error signing in, try again later'
					);
					break;
			}
		}
	};
	return (
		<div className="sign-in-container">
			<h2>Already have an account?</h2>
			<p style={{ marginTop: 0 }}>Sign in with your email and password</p>
			<span
				style={{ color: 'red', fontStyle: 'italic', fontWeight: 'bold' }}
			>
				{errorMessage}
			</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Email"
					type="email"
					name="email"
					required
					value={email}
					onChange={handleChange}
				/>
				<FormInput
					label="Password"
					type="password"
					name="password"
					required
					value={password}
					onChange={handleChange}
				/>
				<div className="buttons-container">
					<Button type="submit">Sign in</Button>
					<Button
						type="button"
						onClick={loginWithGoogle}
						buttonType="google"
					>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
