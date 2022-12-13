import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
	imageURL: {
        type: String,
        required: true
    }
},{timestamps: true});

export { PostSchema };
