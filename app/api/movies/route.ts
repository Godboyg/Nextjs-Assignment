import { connectDB } from "../../../libs/db";
import { NextResponse } from "next/server";
import Movie, { Movietype } from "../../../models/movie";

export async function GET(request: Request) {
  await connectDB();
  const movies: Movietype[] = await Movie.find();
  const mo = [
    { id: "1", title: "Inception", year: 2010 },
    { id: "2", title: "Interstellar", year: 2014 },
  ];
  return Response.json(movies);
}

export async function POST(request: Request) {
  await connectDB();
  const data = await request.json();
  console.log("data and comming data", data , request);
  const movie = new Movie(data);
  await movie.save();
  return Response.json(movie);
}
