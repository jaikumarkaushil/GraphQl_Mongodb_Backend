import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	idUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    idPost: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Posts'
    },
	file: {
        type: String,
        filename: String,
        mimetype: String,
        path: String,
    },
	createdAt: {
		type: Date,
		required: true,
		default: Date.now()
	},
});

export { CommentSchema };
