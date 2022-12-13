import { gql } from 'apollo-server-express';
// import { gql } from "apollo-server";

export default /* GraphQL */ gql`
	type Comment {
		id: ID
		idUser: ID
        idPost: ID
        comment: String!
		created_at: String!
    	updated_at: String!
	}

    type Mutation {
        addComment(post_id: ID!, comment: String!): Comment
    }
`;