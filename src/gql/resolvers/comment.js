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
            const addedComment = await new context.di.model.Comments({
                idPost,
                idUser: context.user.id,
                comment
            })
            if (addedComment){
                addedComment.save();
                return {"message": "You have unliked the post", "success": true};
            }
            else {
                return {"message": "Something went wrong! Try again", "success": false};
            }
        }
	}
};
