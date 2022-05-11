import SignUpForm from '../../components/signup/sign-up.component';
import SignInForm from '../../components/signin/sign-in.component';
import './auth.styles.scss';

const Authentication = () => {
	return (
		<div className="auth-container">
			<SignInForm />
			<SignUpForm />
		</div>
	);
};

export default Authentication;
