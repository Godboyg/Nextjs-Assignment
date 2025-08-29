"use client"
import React, { useState } from "react";

export type Movie = {
  title: string;
  director: string;
  year: number;
  genre: string;
};

interface AddMovieFormProps {
  onAdd: (movie: Movie) => void;
}

const AddMovieForm: React.FC<AddMovieFormProps> = ({ onAdd }) => {

    const [loading , setLoading] = useState(false);

  const [formData, setFormData] = useState<Movie>({
    title: "",
    director: "",
    year: new Date().getFullYear(),
    genre: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.director || !formData.genre) return;
    onAdd(formData);
    console.log("form data",formData);
    setFormData({
      title: "",
      director: "",
      year: new Date().getFullYear(),
      genre: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md bg-white p-6 rounded-xl z-99 shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800">Add New Movie</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full text-black border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="text"
        name="director"
        placeholder="Director"
        value={formData.director}
        onChange={handleChange}
        className="w-full text-black border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="number"
        name="year"
        placeholder="Release Year"
        value={formData.year}
        onChange={handleChange}
        className="w-full text-black border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
        className="w-full text-black border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:cursor-pointer text-white py-2 rounded-xl hover:bg-indigo-700 transition"
        onClick={() => setLoading(true)}
      >
        Add Movie
      </button>
    </form>
  );
};

export default AddMovieForm;