import React from 'react'

type Movie = {
  title: string;
  director: string;
  year: number;
  genre: string;
};

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps){
  return (
    <div className="sm:w-[21vw] w-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
      <h2 className="text-xl font-bold text-gray-800">{movie.title}</h2>
      <p className="text-gray-600">
        <span className="font-medium">Director:</span> {movie.director}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Release Year:</span> {movie.year}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Genre:</span> {movie.genre}
      </p>
    </div>
  )
}

export default MovieCard
