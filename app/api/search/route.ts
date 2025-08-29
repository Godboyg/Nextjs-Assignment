import { connectDB } from "@/libs/db";
import Movie,{ Movietype } from "../../../models/movie";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  const movies = await Movie.find({
    title: { $regex: query, $options: "i" },
  });

  return NextResponse.json(movies);
}