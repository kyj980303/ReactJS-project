import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DetailMovie from "../components/DetailMovie";

// 디테일페이지
function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setLoading(false);
    setMovies(json.data.movie);
  };

  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);

  return (
    <div>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          <DetailMovie
            title={movies.title}
            coverImg={movies.medium_cover_image}
            genres={movies.genres}
            year={movies.year}
            rating={movies.rating}
            runtime={movies.runtime}
            synopsis={movies.synopsis}
            url={movies.url}
          />
        </div>
      )}
    </div>
  );
}
export default Detail;
