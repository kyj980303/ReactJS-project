import PropTypes from "prop-types";

function DetailMovie({
  title,
  coverImg,
  genres,
  year,
  rating,
  runtime,
  synopsis,
  url,
}) {
  return (
    <div>
      <h1>{title}</h1>
      <ul>
        <li>
          <img src={coverImg} alt={title} />
        </li>
        <li>
          <p>genres : {genres}</p>
          <p>year: {year}</p>
          <p>rating: {rating}</p>
          <p>runtime: {runtime}</p>
        </li>
      </ul>
      <h4>synopsis</h4>
      <p>{synopsis}</p>
      <p>For more information</p>
      <p>{url}</p>
    </div>
  );
}

DetailMovie.propTypes = {
  title: PropTypes.string.isRequired,
  small_cover_image: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  year: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  runtime: PropTypes.number.isRequired,
  synopsis: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default DetailMovie;
