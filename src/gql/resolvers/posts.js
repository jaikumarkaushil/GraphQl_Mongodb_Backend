import { mkdir } from "fs";
import { processUpload } from './uploadImage.js';
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
        getAllPosts: async (_, args, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
            return context.di.model.Posts.find().sort({ createdAt: 'desc' }).populate("idUser").lean();
        },
        getPost: async (_, { userName }, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
            const user = await context.di.model.Users.findOne({ userName: userName }).lean();
            const userId = user._id
            const qPosts = await context.di.model.Posts.aggregate([
                { "$match": { "idUser": userId } },
                {
                    "$set": {
                        "idUser": user
                    }
                },
                {
                    "$lookup": {
                        from: "likes",
                        localField: "_id",
                        foreignField: "idPost",
                        as: "postLikes"
                    }
                },
                {
                    "$lookup": {
                        from: "comments",
                        localField: "_id",
                        foreignField: "idPost",
                        as: "comments"
                    }
                },
            ])
            qPosts.forEach(post => {
                post["likes"] = post.postLikes.length
                console.log(post)
            })
            return qPosts
        },
        getMyPosts: async (parent, args, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
            const user = await context.di.authValidation.getUser(context);
            const userId = user._id
            // use either mongoDB agregat or deafult calling method
            // const myPosts = user.posts
            // myPosts["idUser"] = user
            // myPosts["postLikes"] = await Likes(context).find({ idPost: myPosts._id });
            // myPosts["likes"] = myPosts.postLikes.length
            // myPosts["comments"] = await context.di.model.Comments.find({ idPost: myPosts._id });
            // console.log(myPosts)


            const myPosts = await context.di.model.Posts.aggregate([
                { "$match": { "idUser": userId } },
                {
                    "$set": {
                        "idUser": user
                    }
                },
                {
                    "$lookup": {
                        from: "likes",
                        localField: "_id",
                        foreignField: "idPost",
                        as: "postLikes"
                    }
                },
                {
                    "$lookup": {
                        from: "comments",
                        localField: "_id",
                        foreignField: "idPost",
                        as: "comments"
                    }
                }
            ])
            myPosts.forEach(post => {
                post["likes"] = post.postLikes.length
            })
            return myPosts
        },
    },
    Mutation: {
        uploadPost: async (_, { file, caption }, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
            mkdir("images/posts", { recursive: true }, (err) => {
                if (err) throw err;
            });
            const upload = await processUpload(file, "images/posts");

            // saving our file to the mongodb
            const userId = context.user.id
            const imageData = { idUser: userId, imageURL: upload.path, caption: caption }
            const postImage = new context.di.model.Posts(imageData)
            await postImage.save();

            return { "message": "Image with caption is successfully posted" };
        }
    }
};
