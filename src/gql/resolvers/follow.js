

export default {
  Query: {
    getMyFollowers: async (parent, args, context) => {
      context.di.authValidation.ensureThatUserIsLogged(context);
      const user = await context.di.authValidation.getUser(context);
      const userId = user._id
      const followers = await context.di.model.Follows.find({ idUser: userId }).populate("idUser", "idFollower").lean();

      return followers;
    },
    getMyFollowing: async (parent, args, context) => {
      context.di.authValidation.ensureThatUserIsLogged(context);
      const user = await context.di.authValidation.getUser(context);
      const userId = user._id
      const following = await context.di.model.Follows.find({ idFollower: userId }).populate("idUser", "idFollower").lean();

      return following;
    }
  },
  Mutation: {
    followUser: async (_, { id }, context) => {
      // context.di.authValidation.ensureThatUserIsLogged(context);
      const userToFollow = await context.di.model.Users.findById(id).lean();

      const userId = context.user.id
      const alreadyFollowed = await context.di.model.Follows.findOne({ idUser: userId, idFollower: id }).lean();
      if (alreadyFollowed) {
        return { "message": `You already follow ${userToFollow.userName}`, "success": false };
      }
      const addFollow = await new context.di.model.Follows({ idUser: userId, idFollower: id });
      // handle the already exisiting user from the frontend
      if (addFollow) {
        addFollow.save();
        return { "message": `You followed ${userToFollow.userName}`, "success": true };
      }
      return { "message": `Couldn't follow ${userToFollow.userName}. Try again`, "success": false };

    },
    unfollowUser: async (_, { id }, context) => {
      context.di.authValidation.ensureThatUserIsLogged(context);
      const userToUnfollow = context.di.model.Users.findById(id).lean();

      const userId = context.user.id
      const followData = { idUser: userId, idFollower: id }
      const unfollowUser = await context.di.model.Follows.deleteOne(followData);

      if (unfollowUser) {
        return { "message": `You unfollowed ${userToUnfollow.userName}`, "success": true };
      }
      return { "message": `Couldn't unfollow ${userToUnfollow.userName}. Try again`, "success": false };
    }
  }
};
