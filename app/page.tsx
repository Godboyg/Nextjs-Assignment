"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import Header from "./Components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import MovieCard from "./Components/MovieCard";
import AddMovieForm, { Movie } from "./Components/AddMovieForm";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Movietype } from "@/models/movie";

export default function Home() {
  const { data: session , status} = useSession();

  const isAuthenticated: boolean = status === "authenticated";
  console.log("aiuthen",isAuthenticated);
  const isLoading: boolean = status === "loading";

  const [allMovie , setAllMovie] = useState<Movietype[]>([]);
  const [open , setOpen] = useState<boolean>(false);
  const [isOpen , setIsOpen] = useState<string | null>(null);
  const [query , setQuery] = useState("");
  const [edit , setEdit] = useState<boolean>(false);
  const [selectedMovie , setSelectedMovie] = useState<string>("");
  const [id , setId] = useState<string>("");

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
  
    const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.title || !formData.director || !formData.genre) return;
      console.log("form data",formData);
      const res = await axios.put(`/api/movies/${id}`, formData);
      console.log("movie edited",res.data);
      if(res.status === 200){
        toast.success("Edit Successful");
        setTimeout(() => {
          window.location.reload();
        }, 300);
        setFormData({
          title: "",
          director: "",
          year: new Date().getFullYear(),
          genre: "",
        });
      }
    };

  useEffect(() => {
    axios.get("/api/movies")
    .then((res) => {
      console.log("the res",res.data);
      console.log("size",allMovie.length);
      setAllMovie(res.data);
    })
  },[])

  useEffect(() => {

    if(query.trim() === ""){
      console.log("nothing to search");
    }

    const fetchMovies = async () => {
      // setLoading(true);
      try {
        const res = await axios.get(`/api/search?q=${query}`);
        setAllMovie(res.data);
      } catch (err) {
        toast.error("Failed to fetch movies");
      } finally {
        // setLoading(false);
      }
    };

    const timeout = setTimeout(fetchMovies , 300);
    return () => clearTimeout(timeout);
  },[query])

  const handleAddMovie = async(data: Movie) => {
    console.log(data);
    try{
      const res = await axios.post("/api/movies" , data);
      console.log("response",res);
      if(res.data){
        toast.success("Movie added successfully!");
        setTimeout(() => {
          window.location.reload();
        },300)
      }
    } catch (err) {
    console.error(err);
    }
  }

  const toggleMenu = (id: string) => {
    setIsOpen(isOpen === id ? null : id);
  }

  const handleDelete = async(id: string) => {
    try {
      console.log("card removed",id);
      const res = await axios.delete(`/api/movies/${id}`);
      console.log("delete response",res);
      if(res.status === 200){
        toast.success("Movie Deleted Successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.log("error",error);
    }
  }

  const handleEdit = async(id: string) => {
    setEdit(true);
    const res = await axios.get(`/api/movies/${id}`);
    setId(id);
    setSelectedMovie(res.data);
    setTimeout(() => {
      setSelectedMovie(res.data);
    }, 300);
    console.log("res",res.data);
  }

  console.log("status",status);

  return (
    <div className="p-4 relative">
      <Toaster />
      <Header session={session} isAuthenticated={isAuthenticated} isloading={isLoading} />
      <div className="w-full h-[90vh] py-4">
        <div className="flex items-center justify-around">
          <div className="flex items-center justify-center border border-white rounded-full bg-black">
            <span className="text-xl text-white font-bold"><CiSearch /></span>
            <input 
             type="text" 
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             className="border-none outline-none p-1 w-[55vw] sm:w-[30vw] text-black" placeholder="Search Movie..."/>
          </div>
          <div className="border border-white rounded-full w-[25vw] flex items-center justify-center sm:w-[14vw] md:w-[13vw] lg:w-[11vw] xl:w-[8vw] p-2 sm:p-2 text-black bg-green-300 text-[3.8vw] sm:text-[2vw] md:text-[1.7vw] lg:text-[1.3vw] xl:text-[1vw] hover:cursor-pointer"
          onClick={() => setOpen(true)}>
            Add Movie
          </div>
          <div className={`h-screen w-full absolute top-0 left-0 ${open ? "block bg-transparent bg-opacity-70 backdrop-blur-2xl" : "hidden" }`}>
            <span className="absolute top-3 hover:cursor-pointer left-3 text-red-500" onClick={() => setOpen(false)}>Close</span>
            <div className="flex items-center justify-center h-full">
              <AddMovieForm onAdd={handleAddMovie}/>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col sm:text-center sm:justify-center sm:flex-row flex-wrap gap-5 sm:gap-10">
          {
            allMovie.length >= 1 ? (
              allMovie.map((movie) => (
                <div className={`w-full sm:w-[20vw] gap-2 ${open ? "hidden" : "relative"}`}>
                <MovieCard 
                movie={{
                  title: movie.title,
                  director: movie.director,
                  year: movie.year,
                  genre: movie.genre,
                }}
                />
                <div className="absolute top-5 right-2 text-black hover:cursor-pointer text-xl font-light">
                  <span onClick={() => toggleMenu(movie._id)}><BsThreeDotsVertical /></span>
                  {
                    isOpen === movie._id && (
                      <div className={`flex flex-col gap-3 items-center justify-center absolute p-2 bg-black rounded-md top-full right-3`}>
                       <span className="text-white text-[3.8vw] sm:text-[2vw] md:text-[1.7vw] lg:text-[1.3vw] xl:text-[1vw]" onClick={() => handleDelete(movie._id)}>Delete</span>
                       <span className="text-white text-[3.8vw] sm:text-[2vw] md:text-[1.7vw] lg:text-[1.3vw] xl:text-[1vw]" onClick={() => handleEdit(movie._id)}>Edit</span>
                      </div>
                    )
                  }
                </div>
              </div>
              ))
            ) : (
              <span className="">No Movie Available</span>
            )
          }
        </div>
       {
        edit && isAuthenticated && (
          <div className={`absolute top-0 left-0 h-screen w-full bg-transparent bg-opacity-60 backdrop-blur-xl ${edit ? "block" : "hidden"}`}>
          <span className="absolute top-3 left-3 text-red-500 hover:cursor-pointer" onClick={() => setEdit(false)}>Close</span>
          <div className="h-full w-full flex items-center justify-center">
              
              <form
      onSubmit={handleSubmit}
      className="max-w-md bg-white p-6 rounded-xl z-99 shadow-md space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-800">Edit Movie</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full text-black required border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="text"
        name="director"
        placeholder="Director"
        value={formData.director}
        onChange={handleChange}
        className="w-full required text-black required border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="number"
        name="year"
        placeholder="Release Year"
        value={formData.year}
        onChange={handleChange}
        className="w-full required text-black required border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="text"
        name="genre"
        placeholder="Genre"
        value={formData.genre}
        onChange={handleChange}
        className="w-full required text-black required border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:cursor-pointer text-white py-2 rounded-xl hover:bg-indigo-700 transition"
      >
        Edit
      </button>
    </form>
           </div>
          </div>
        )
       }
       {
        edit && !isAuthenticated && (
          <div className="absolute top-0 left-0 h-screen bg-transparent backdrop-blur-2xl bg-opacity-50 w-full flex items-center justify-center">
            <span className="absolute top-3 left-3 text-red-500 hover:cursor-pointer" onClick={() => setEdit(false)}>Close</span>
            <span className="text-white font-light">Pls Authenticate to Edit!!</span>
          </div>
        )
       }
      </div>
    </div>
  );
}
