import { createWriteStream, mkdir } from "fs";
import shortid from "shortid";
/**
 * All resolvers related to posts
 * @typedef {Object}
 */
let Likes = (context) => context.di.model.Likes;

const storeUpload = async ({ stream, filename, mimetype }) => {
    const id = shortid.generate();
    const path = `images/${id}-${filename}`;
    return new Promise((resolve, reject) =>
    stream
        .pipe(createWriteStream(path))
        .on("finish", () => resolve({ id, path, filename, mimetype }))
        .on("error", reject)
    );
};
const processUpload = async (upload) => {
    const uploadedData = await upload
    const { createReadStream, filename, mimetype } = uploadedData;
    const stream = createReadStream();
    const file = await storeUpload({ stream, filename, mimetype });
    return file;
};

export default {
	Query: {
		/**
		 * It allows to administrators users to list all users registered
		 */
        getAllPosts: async (_,args) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
            return context.di.models.Posts.find().sort({ createdAt: 'asc'}).lean();
        },
		getMyPosts:  async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			const sortFilter = { createdAt: 'asc' };
            if(context.user && context.user.userName) {
                const userName = context.user.userName
                filteredPosts = context.di.models.Posts.findOne({userName}).lean();
                return filteredPosts;
            }
            if(context.user && context.user.email) {
                const email = context.user.email
                filteredPosts = context.di.models.Posts.findOne({email}).lean();
                return filteredPosts;
            }
		},
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
        uploadPost: async (_, { file }, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
            mkdir("postImages", { recursive: true }, (err) => {
                if (err) throw err;
            });
            const upload = await processUpload(file);
            // save our file to the mongodb
            const userId = context.user._id
            console.log(userId)
            const imageData = {idUser: userId, imageURL: upload.path}
            const postImage = new context.di.model.Posts(imageData)
            await postImage.save();
            return upload;
        },
	}
};
