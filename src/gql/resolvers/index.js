import merge from 'lodash.merge';

import users from './users.js';
import auth from './auth.js';
import posts from './posts.js'
import comment from './comment.js';
import like from './like.js';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';

const customResolvers =  {
	Upload: GraphQLUpload
}
export const resolvers = merge(
	users,
	auth,
	posts,
	comment,
	like,
	customResolvers
);
