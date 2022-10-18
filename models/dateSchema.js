import mongoose from "mongoose";

const { Schema } = mongoose;

// We create a schema to be used inside another schema,
// hence we have no model for dateSchema
export const dateSchema = new Schema({
  created: { type: Date, default: Date.now }, //assigning object with options (type = datatype (string) , default = default value when adding a new document).
  updated: { type: Date, default: Date.now },
});
