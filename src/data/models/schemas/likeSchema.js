import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "users",
    },
    idPost: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'posts'
    }
}, { timestamps: true });

export { LikeSchema };
