import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    idPost: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'posts'
    },
    comment: {
        type: String,
    },
}, { timestamps: true });

export { CommentSchema };
