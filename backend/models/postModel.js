import mongoose from "mongoose";

const postSchema = new mongoose.Schema({

  professorId: {
    type: String,
    required: true
  },

  professorData: {
    type: Object,
    required: true
  }, // snapshot

  content: {
    type: String,
    required: true
  },

  image: {
    type: String
  }, // optional

  date: {
    type: Number,
    required: true
  }

});

const postModel =
  mongoose.models.post ||
  mongoose.model("post", postSchema);

export default postModel;