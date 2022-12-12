import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	idUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
	imageURL: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default:0
    },
    likedBy: {
        type: Array,
        default:[]
    },
    // comments: {
    //     type: String,
    //     default: ''
    // }
},{timestamps: true});

export { PostSchema };
