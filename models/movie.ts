import mongoose , { Schema , Document , Model } from "mongoose";

export interface Movietype extends Document {
  _id: string;
  title: string;
  director: string;
  year: number;
  genre: string;
}

const MoviceSchema: Schema = new Schema({
  title: { type: String, required: true },
  director: { type: String },
  year: { type: Number },
  genre: { type: String },
})

const MovieModel = mongoose.models.Movie || mongoose.model("Movie", MoviceSchema);

export default MovieModel;