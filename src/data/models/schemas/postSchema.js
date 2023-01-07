import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
	imageURL: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    }
},{timestamps: true});

export { PostSchema };
