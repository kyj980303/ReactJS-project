import PropTypes from "prop-types";

function DetailMovie({
  title,
  coverImg,
  year,
  rating,
  runtime,
  like,
  download,
  description_full,
  url,
}) {
  return (
    <div className="detailMovie">
      <h1 className="movieTitle">🎬 {title} 🎬</h1>
      <ul className="detail">
        <li>
          <img src={coverImg} alt={title} className="coverImg" />
        </li>
        <li>
          <p>
            <span>Release date : </span> {year}
          </p>
          <p>
            <span>Rating : </span> {rating}
          </p>
          <p>
            <span>Runtime : </span>
            {runtime} 분
          </p>
          <p>
            <span> Like : </span>
            {like}
          </p>
          <p>
            <span>Download : </span>
            {download}
          </p>
        </li>
      </ul>
      <h4 className="syn">📽 synopsis</h4>
      {description_full === "" ? (
        <p className="synp">
          If you are curious about the plot of the movie, please click the link
          below.
        </p>
      ) : (
        <p className="synp">{description_full}</p>
      )}
      <p className="infor">👀 For more information ⬇︎</p>
      <p className="synp2">
        <a href={url}>{url}</a>
      </p>
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
  description_full: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default DetailMovie;
