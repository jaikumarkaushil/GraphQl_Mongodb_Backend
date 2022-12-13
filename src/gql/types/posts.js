import { gql } from 'apollo-server-express';
// import { gql } from "apollo-server";

export default /* GraphQL */ gql`
    scalar Upload
	type Post {
		id: ID
		idUser: ID!
		filename: String
        mimetype: String
        path: String 
		likes: Int!
		created_at: String!
    	updated_at: String!
		comments: [Comment!]!
		postLikes: [Like!]!
	}

	type Query {
		""" Get list of all users registered on database """
		getAllPosts: [Post]
		getPost(idPost: ID!): Post
		getMyPosts(userName: String, email: String): Post
	}

    type Mutation {
        uploadPost(file: Upload!): Post!
    }

`;