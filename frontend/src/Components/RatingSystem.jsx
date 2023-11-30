import  { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Rating from "react-rating-stars-component";
import PropTypes from "prop-types";

const RatingSystem = ({ itemId, onModel }) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.auth.userId);

  const modelDisplayText = {
    Blog: "Rate this post",
    Gallery: "Rate this image",
    Portal: "Rate this portal",
  };

  const displayText = modelDisplayText[onModel] || "Rate this item";


const fetchAverageRating = async () => {
  try {
    const { data } = await axios.get(`/api/ratings/average/${onModel}/${itemId}`);
    const { averageRating, ratingCount } = data.data;
    setAverageRating(averageRating);
    setRatingCount(ratingCount);
  } catch (error) {
    setError("Failed to fetch average rating.");
    console.error(error);
  }
};

  useEffect(() => {
    fetchAverageRating();
  }, []);

  const ratingChanged = (newRating) => {
    setRatingValue(newRating);
    handleSubmit(newRating);
  };

const handleSubmit = async (newRating) => {
  try {
    await axios.post(`/api/ratings`, {
      value: newRating,
      author: userId,
      itemId,
      onModel,
    });
    await fetchAverageRating();
  } catch (err) {
    setError("Failed to post the rating.");
  }
};

  return (
    <div>
      {averageRating !== null && (
        <div className="star-rating">
          <Rating
            key={averageRating}
            count={5}
            onChange={ratingChanged}
            size={24}
            isHalf={true}
            activeColor="#ffd700"
            value={averageRating}
            edit={false}
          />

          <p>
            Rating: {averageRating.toFixed(1)} out of 5 ({ratingCount}{" "}
            {ratingCount === 1 ? "vote" : "votes"})
          </p>
          
          <h5>{displayText}:</h5>
          {error && <p className="error">{error}</p>}
          <Rating
            count={5}
            onChange={ratingChanged}
            size={30}
            isHalf={true}
            activeColor="#ffd700"
            value={ratingValue}
            minValue={1}
          />
        </div>
      )}
    </div>
  );
};

RatingSystem.propTypes = {
  itemId: PropTypes.string.isRequired,
  onModel: PropTypes.string.isRequired,
};

export default RatingSystem;
