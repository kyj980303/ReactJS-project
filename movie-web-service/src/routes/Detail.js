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
    <div className="movie">
      {loading ? (
        <h1 className="loading">loading...</h1>
      ) : (
        <div>
          <DetailMovie
            title={movies.title}
            coverImg={movies.large_cover_image}
            year={movies.year}
            rating={movies.rating}
            runtime={movies.runtime}
            like={movies.like_count}
            download={movies.download_count}
            description_full={movies.description_full}
            url={movies.url}
          />
        </div>
      )}
    </div>
  );
}
export default Detail;
