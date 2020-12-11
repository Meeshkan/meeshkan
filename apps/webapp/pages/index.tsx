import { useEffect, useContext } from 'react';
import Layout from '../components/templates/layout';
import SideBar from '../components/organisms/sidebar';
import LoadingScreen from '../components/organisms/loading-screen';
import Grid from '../components/organisms/grid';
import withAuth from '../hocs/with-auth';
import { UserContext } from '../utils/user';

type IndexProps = {
	cookies: string | undefined;
};

const Index = (props: IndexProps) => {
	const { projects, project, setProject } = useContext(UserContext);

	useEffect(() => {
		if (projects.length > 0) {
			setProject(projects[0]);
		}
	}, [projects, setProject]);

	if (projects.length > 0 && project.id === -1) {
		return <LoadingScreen />;
	}

	return (
		<Layout>
			<SideBar />
			<Grid />
		</Layout>
	);
};

export default withAuth(Index);

export { getServerSideProps } from '../components/molecules/chakra';
