import { connectDB } from "../../../libs/db";
import Movie, { Movietype } from "../../../models/movie";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
  await connectDB();
  const movies: Movietype[] = await Movie.find();
  return NextResponse.json(movies);
}

export async function POST(request: Request) {
  await connectDB();
  const data = await request.json();
  console.log("data and comming data", data , request);
  const movie = new Movie(data);
  await movie.save();
  return NextResponse.json(movie);
}
