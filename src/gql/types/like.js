import { gql } from 'apollo-server-express';
// import { gql } from "apollo-server";

export default /* GraphQL */ gql`
	type Like {
		id: ID
		idUser: ID
        idPost: ID
	}

	type Query {
		getPostLikes(idPost: ID): Int  
        userLikedPosts(idUser: ID, idPost: ID): Like
		isLiked(idPost: ID): Boolean
	}

    type Mutation {
        addLike(idPost: ID): Boolean
        deleteLike(idPost: ID): Boolean
    }
`;