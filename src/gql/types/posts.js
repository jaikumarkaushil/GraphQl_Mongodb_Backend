import { gql } from 'apollo-server-express';
// import { gql } from "apollo-server";

export default /* GraphQL */ gql`
    scalar Upload
	type Post {
		id: ID
		filename: String
        mimetype: String
        path: String
	}

	type Query {
		""" Get list of all users registered on database """
		getAllPosts: [Post]
		getMyPosts(userName: String, email: String): Post
	}

    type Mutation {
        uploadPost(file: Upload!): Post!
        # TODO: Multiplefile upload
        # uploadPosts(file: [Upload!]!): Post! 
    }

`;