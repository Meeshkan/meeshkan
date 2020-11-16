import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../utils/graphql/schema';

const apolloServer = new ApolloServer({
	schema,
	introspection: true,
	playground: true,
	// mocks: true,
	apollo: {
		key: process.env.APOLLO_API_KEY,
	},
	context(ctx) {
		return ctx;
	},
});

export const config = {
	api: {
		bodyParser: false,
	},
	engine: {
		reportSchema: true,
		variant: 'current',
	},
};

export default apolloServer.createHandler({ path: '/api/graphql' });
