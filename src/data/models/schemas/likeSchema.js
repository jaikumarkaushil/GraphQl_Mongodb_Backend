import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
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
	likeCount: {
        type: Number,
        default: 0
    },
},{timestamps: true});

export { LikeSchema };
