import posts from './posts.js'
/**
 * All resolvers related to users
 * @typedef {Object}
 */
let Users = (context) => context.di.model.Users;

export default {
	Query: {
		/**
		 * It allows to administrators users to list all users registered
		 */
		listAllUsers: async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			const sortCriteria = { registrationDate: 'asc' };
			const userData = context.di.model.Users.find().sort(sortCriteria).lean();
			return userData
		},
		getUser: async (_, { id, email }, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			let user = null;
			if (id) {
				user = await Users(context).findById(id);
			}
			if (email) {
				user = await Users(context).findOne({ email });
			}
			if (!user) {
				throw new Error("User not found in our database");
			}
			const userId = user.id;
			const userName = user.userName;
			const userFollowers = await context.di.model.Follows.find({ "idUser": userId }).count();
			const userFollowing = await context.di.model.Follows.find({ "idFollower": userId }).count();
			const userPosts = await posts.Query.getPost(_, { userName }, context);
			user["posts"] = userPosts;
			user["totalPosts"] = userPosts.length
			user["totalFollowers"] = userFollowers
			user["totalFollowing"] = userFollowing
			return user;


		},
		searchUser: async (_, search, context) => {
			const users = await Users(context).find({
				userName: { $regex: search, $options: "i" },
			});
			return users;
		},
		changeProfileType: async (_, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			try {
				const user = await context.di.authValidation.getUser(context)
				if (user.isPrivate) {
					await Users(context).findOneAndUpdate(
						{ _id: context.user.id }, { isPrivate: false }, { new: true }
					).lean();
					return { "message": "User status changed successfully to public.", "success": false }
				}
				await Users(context).findOneAndUpdate(
					{ _id: context.user.id }, { isPrivate: true }, { new: true }
				).lean();
				return { "message": "User status changed successfully to private", "success": true }
			}
			catch (err) {
				return { "message": "User status didn't change. Try again", "success": false }
			}
		},
		me: async (_, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			const user = await context.di.authValidation.getUser(context)

			// console.log(user)
			const userId = user._id
			const userFollowers = await context.di.model.Follows.find({ "idUser": userId }).count();
			const userFollowing = await context.di.model.Follows.find({ "idFollower": userId }).count();
			const myposts = await posts.Query.getMyPosts(_, "", context);
			user.posts = myposts;
			user["totalPosts"] = myposts.length
			user["totalFollowers"] = userFollowers
			user["totalFollowing"] = userFollowing

			return user
		}

	},
	Mutation: {

	}
};
