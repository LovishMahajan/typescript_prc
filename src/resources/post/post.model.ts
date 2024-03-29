import { Schema, model } from "mongoose";
import Post from "@/resources/post/post.interface";

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: "Posts",
    }
);

export default model<Post>("Posts", PostSchema);
