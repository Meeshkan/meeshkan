import ChakraProvider from '../components/molecules/chakra';
import LoadingScreen from '../components/organisms/loading-screen';
import AuthScreen from '../components/organisms/auth-screen';
import { UserContext, IUser } from '../utils/user';
import { useFetchUser } from '../hooks/use-fetch-user';

export interface IWithAuthProps {
	cookies: string | undefined;
	user?: IUser;
}

const withAuth = (PageComponent) => {
	return (props: IWithAuthProps): JSX.Element => {
		const { user, loading } = useFetchUser(props.user);
		if (loading) {
			return (
				<ChakraProvider cookies={props.cookies}>
					<LoadingScreen />
				</ChakraProvider>
			);
		}

		if (!user || (user && user.error)) {
			return (
				<ChakraProvider cookies={props.cookies}>
					<AuthScreen />
				</ChakraProvider>
			);
		}

		return (
			<ChakraProvider cookies={props.cookies}>
				<UserContext.Provider value={user}>
					<PageComponent {...props} />
				</UserContext.Provider>
			</ChakraProvider>
		);
	};
};

export default withAuth;
