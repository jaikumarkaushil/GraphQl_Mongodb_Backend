import { createWriteStream, mkdir } from "fs";
import shortid from "shortid";
/**
 * All resolvers related to posts
 * @typedef {Object}
 */
let Likes = (context) => context.di.model.Likes;

export default {
	Query: {
	},
	Mutation: {
        addComment: async (_,{idPost, comment},context) => {
            try {
                const comment = new context.di.model.Comments.findOne({
                    idPost,
                    idUser: context.user._id,
                    comment: comment
                });
                comment.save();
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
	}
};
