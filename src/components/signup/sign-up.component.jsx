import { useState } from 'react';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up.styles.scss';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const [errorMessage, setErrorMessage] = useState('');
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			setErrorMessage('Passwords must match.');
			return;
		}
		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);
			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				setErrorMessage('Email already exists, try sigining in');
			}
			console.log('something happened with creating user', error);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};
	return (
		<div className="sign-up-container">
			<h2>Don't have an account? </h2>
			<p>Sign up with your email and password.</p>
			<span
				style={{ color: 'red', fontStyle: 'italic', fontWeight: 'bold' }}
			>
				{errorMessage}
			</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					type="text"
					name="displayName"
					required
					value={displayName}
					onChange={handleChange}
				/>
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
					minLength={6}
					value={password}
					onChange={handleChange}
				/>
				<FormInput
					label="Confirm Password"
					type="password"
					name="confirmPassword"
					minLength={6}
					required
					value={confirmPassword}
					onChange={handleChange}
				/>
				<Button type="submit">Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
