import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
  firstName: {
    type: String,
    required: "enter a first name",
  },
  lastName: {
    type: String,
    required: "enter last name",
  },
  email: {
    type: String,
    required: "enter email",
  },
  company: {
    type: String,
  },
  phone: {
    type: Number,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});
