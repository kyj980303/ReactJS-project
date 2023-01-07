import { useEffect, useState } from "react";
import Movie from "../components/Movie";

// 메인페이지
function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year"
      )
    ).json();
    console.log(json);
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="movie">
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <ul className="movieList">
          <h1 className="tit">
            Movie rating of <span>8</span> or <span>higher </span>
            <p>movie list 🍿 🎬</p>
          </h1>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              rating={movie.rating}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
export default Home;
