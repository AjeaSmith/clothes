import Directory from '../../components/directory/directory.component';
import { categories } from '../../data/categories';
import { Outlet } from 'react-router-dom';
const Home = () => {
	return (
		<div>
			{/* <Outlet /> */}
			<Directory categories={categories} />
		</div>
	);
};

export default Home;
