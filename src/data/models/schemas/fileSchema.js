import { Schema } from "mongoose";
const FileSchema = new Schema({
    filename: String,
    mimetype: String,
    path: String,
});


export {FileSchema };
