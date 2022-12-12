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
		listAllUsers:  async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);

			const sortCriteria = { registrationDate: 'asc' };
			return context.di.models.Users.find().sort(sortCriteria).lean();
		},
		getUser: async (_, {id, email}, context) => {
			// context.di.authValidation.ensureThatUserIsLogged(context);
			let user = null;
			if (id) {
				user = await Users(context).findById(id);
				return user
			}
			if (email){
				user = await Users(context).findOne({email});
				return user
			}
			if (!user){ 
				throw new Error("User not found in our database");
			}
		},
		searchUser: async (_,search,context) => {
			const users = await Users(context).find({
				userName: { $regex: search, $options: "i" },
			}); 
			return users;
		}

	},
	Mutation: {
	}
};
