// import path from 'path';
// import { fileURLToPath, pathToFileURL } from 'url';

// import { loadFiles } from '@graphql-tools/load-files';
// import { mergeTypeDefs } from '@graphql-tools/merge';

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// export const initTypeDefinition = async () => {
// 	const resolversArray = await loadFiles(__dirname, {
// 		extensions: ['js'],
// 		ignoreIndex: true,
// 		requireMethod: (path) => {
// 			return import(pathToFileURL(path));
// 		},
// 	});

// 	return mergeTypeDefs(resolversArray);
// };

import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
	scalar Upload
	# auth schema
	type Token {
		token: String
	}

	# User Schema
	type User {
		_id: ID
		fullName: String
		userName: String
		email: String
		profileImage: String
		isActive: Boolean
		isPrivate: Boolean
		registrationDate: String!
		lastLogin: String!
		lastLogout: String!
		posts: [Post]!
		totalPosts: Int!
		totalFollowers: Int!
		totalFollowing: Int!
	}

	type UserFollower {
		_id: ID
		idUser: ID
		idFollower: ID
		createdAt: String!
		updatedAt: String!
	}
	#shared schema
	type DeleteResult {
		deletedCount: Int!
	}
	#post schema
	type Post {
		_id: ID
		idUser: User!
		caption: String
		imageURL: String!
		likes: Int!
		postLikes: [PostLike]
		comments: [PostComment]
		createdAt: String!
    updatedAt: String!
	}

	type successMessage {
		message: String!
		success: Boolean
	}
	# like schema
	type PostLike {
		_id: ID
		idUser: ID
    idPost: ID
		createdAt: String!
    updatedAt: String!
	}

	# comment schema
	type PostComment {
		_id: ID
		idUser: ID
    idPost: ID
    comment: String!
		createdAt: String!
    updatedAt: String!
	}


	# Query: 
	type Query {
		# user query
		""" Get list of all users registered on database """
		listAllUsers: [User]
		me: User!
		getUser(id: ID, email: String): User
		searchUser(search: String): [User]
		changeProfileType: successMessage

		# post query
		getAllPosts: [Post]
		getPost(userName: String): [Post!]!
		getMyPosts: [Post!]!

		# follow
		getMyFollowers: successMessage
		getMyFollowing: successMessage

		#stories
		getStories: [User]

		# like query
		getPostLikes(idPost: ID): Int  
    userLikedPosts(idUser: ID, idPost: ID): [PostLike]
		isLiked(idPost: ID): Boolean
	}


	type Mutation {
		# auth mutation
		""" It allows users to register """
		registerUser(email: String!, password: String!, userName: String!, fullName: String!, profileImage: Upload!): Token

		""" It allows users to authenticate """
		authUser(email: String!, password: String!): Token

		logout: String!
		""" It allows to user to delete their account permanently """
		deleteMyUserAccount: DeleteResult

		# post mutation
		uploadPost(file: Upload!, caption: String!): successMessage!

		# like mutation
		addLike(idPost: ID): successMessage!
    deleteLike(idPost: ID): successMessage!

		# comment
		addComment(idPost: ID!, comment: String!): successMessage!

		# follow
		followUser(id: ID!): successMessage!
		unfollowUser(id: ID!): successMessage!
	}
`;

