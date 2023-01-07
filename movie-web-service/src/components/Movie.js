import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// 영화정보
function Movie({ id, coverImg, title, rating }) {
  return (
    <li>
      <Link to={`/movie/${id}`}>
        <img src={coverImg} alt={title} className="movieImg" />
      </Link>
      <h4>
        <Link to={`/movie/${id}`} className="link">
          {title}
        </Link>
      </h4>
      <p className="rat">⭐️ {rating}</p>
    </li>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default Movie;
