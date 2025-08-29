import { connectDB } from "../../../../libs/db";
import Movie, { Movietype } from "../../../../models/movie";
import { NextResponse } from "next/server";

export async function GET(_req: Request, { params }: { params: Record<string, string>  }) {
  await connectDB();
  const { id } = params;
  const movie: Movietype | null = await Movie.findById(id);
  return NextResponse.json(movie);
}

export async function PUT(request: Request, { params }: { params: Record<string, string>  }) {
  await connectDB();
  const { id } = params;
  const data = await request.json();
  const movie: Movietype | null = await Movie.findByIdAndUpdate(id, data, { new: true });
  return NextResponse.json(movie);
}

export async function DELETE(_req: Request, { params }: { params: Record<string, string> }) {
  await connectDB();
  const { id } = params;
  await Movie.findByIdAndDelete(id);
  return NextResponse.json({ message: "Movie deleted" });
}