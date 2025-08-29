import { connectDB } from "../../../../libs/db";
import Movie, { Movietype } from "../../../../models/movie";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const movie: Movietype | null = await Movie.findById(params.id);
  return NextResponse.json(movie);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await request.json();
  const movie: Movietype | null = await Movie.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(movie);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  await Movie.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Movie deleted" });
}