import mongoose from "mongoose";

const { Schema } = mongoose;

export const commentSchema = new Schema({
  author: { type: String, default: "Anonymous" },
  text: { type: String, required: true },
});
