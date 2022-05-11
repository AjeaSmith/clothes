import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './navigation.styles.scss';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';

const Navigation = () => {
	return (
		<Fragment>
			<section className="nav-wrapper">
				<Link className="logo-container" to="/">
					<CrownLogo className="logo" />
				</Link>
				<nav className="nav-links-container">
					<Link className="nav-link" to="/shop">
						SHOP
					</Link>
					<Link className="nav-link" to="/auth">
						SIGN IN
					</Link>
				</nav>
			</section>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
