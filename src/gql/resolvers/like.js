import { createWriteStream, mkdir } from "fs";
import shortid from "shortid";
/**
 * All resolvers related to posts
 * @typedef {Object}
 */
let Likes = (context) => context.di.model.Likes;

export default {
	Query: {
		/**
		 * It allows to administrators users to list all users registered
		 */
        userLikedPosts: async (_,{idPost}, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
            const userId = context.user._id;
            return context.di.models.Like.find({userId, idPost}).lean();
        },
		getPostLikes:  async (parent, {idPost}, context) => {
			// context.di.authValidation.ensureThatUserIsLogged(context);
			const sortFilter = { createdAt: 'asc' };
            count = context.di.models.Likes.countDocuments({idPost});
            return count;
		},
        isLiked: async (_,{idPost}, context) => {
            try {
                const result = await context.di.model.Likes.findOne({ idPost }).where({
                    idUser: context.user._id,
                });
                if (!result) throw new Error("The post is not liked");
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
        // isLiked: async (_, {idPost}, context) => {
        //     return;
        // },
		// countLikes: async (_, {id, email}, context) => {
		// 	let user = null;
		// 	// if (id) {
		// 	// 	user = await Users(context).findById(id);
		// 	// 	return user
		// 	// }
		// 	// if (email){
		// 	// 	user = await Users(context).findOne({email});
		// 	// 	return user
		// 	// }
		// 	// if (!user){ 
		// 	// 	throw new Error("User not found in our database");
		// 	// }'
        //     return user;
		// }
	},
	Mutation: {
        addLike: async (_,{idPost},context) => {
            try {
                const like = new context.di.model.Likes({
                    idPost,
                    idUser: context.user._id,
                });
                like.save();
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
        deleteLike: async (_,{idPost}, context) => {
            try {
                await context.di.model.Likes.findOneAndDelete({ idPost }).where({
                    idUser: context.user._id,
                });
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
	}
};
