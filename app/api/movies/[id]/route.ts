import { connectDB } from "../../../../libs/db";
import Movie, { Movietype } from "../../../../models/movie";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }) {
  await connectDB();
  const { id } = await params;
  const movie: Movietype | null = await Movie.findById(id);
  return NextResponse.json(movie);
}

export async function PUT(request: Request, { params }) {
  await connectDB();
  const data = await request.json();
  const { id } = await params;
  const movie: Movietype | null = await Movie.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(movie);
}

export async function DELETE(_req: Request, { params }) {
  await connectDB();
  const { id } = await params;
  await Movie.findByIdAndDelete(id);
  return NextResponse.json({ message: "Movie deleted" });
}