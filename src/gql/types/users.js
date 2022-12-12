import { gql } from 'apollo-server-express';

export default /* GraphQL */ gql`
	type User {
		id: ID
		fullName: String
		userName: String
		email: String
		isActive: Boolean
		registrationDate: String
		lastLogin: String
	}

	type Query {
		""" Get list of all users registered on database """
		listAllUsers: [User]
		getUser(id: ID, email: String): User
		searchUser(search: String): [User]
	}
`;