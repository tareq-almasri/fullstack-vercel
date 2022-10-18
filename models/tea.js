import mongoose from "mongoose";
import { dateSchema } from "./dateSchema.js";
import { commentSchema } from "./commentSchema.js";

const { Schema, model } = mongoose;

// field = mongodb terminology for the document properties

const teaSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  category: {
    // describes the product's relationship to the store
    type: String,
    required: true,
    enum: ["black", "green", "herbal", "fruit"],
  },
  ingredients: { type: [String] },
  price: { type: Number, default: 1, min: 1, max: 100 },
  // nested path
  origin: {
    country: String,
    region: String,
  },
  // single nested subdocument
  dates: { type: dateSchema },
  // array of subdocuments
  // comments: {
  //   type: [
  //     {
  //       author: { type: String, default: "Anonymous" },
  //       text: { type: String, required: true },
  //     },
  //   ],
  // },
  comments: {
    type: [commentSchema],
  },
});

//creating the model which we can use to interact with the database
// "Tea" is a string reference to the model
const Tea = model("tea", teaSchema);

export default Tea;
