import mongoose from 'mongoose';

import { UsersSchema, PostSchema, LikeSchema, CommentSchema } from './schemas/index.js';

export const models = {
	Users: mongoose.model('users', UsersSchema),
	Posts: mongoose.model('posts', PostSchema),
	Comments: mongoose.model('comments', CommentSchema),
	Likes: mongoose.model('likes', LikeSchema)
};
