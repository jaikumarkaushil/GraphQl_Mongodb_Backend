import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FollowSchema = new Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "users",
  },
  idFollower: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'users'
  }
}, { timestamps: true });

export { FollowSchema };
