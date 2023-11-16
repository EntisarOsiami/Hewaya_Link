import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector } from "react-redux";
import Rating from "react-rating-stars-component";

const RatingSystem = ({ itemId, onModel }) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [error, setError] = useState(null);

  const userId = useSelector((state) => state.auth.userId);

  const fetchAverageRating = useCallback(async () => {
    setError(null);
    try {
      const response = await axios.get(
        `/api/ratings/average/${onModel}/${itemId}`
      );
      if (response.data && response.data.data) {
        setAverageRating(response.data.data.averageRating);
        setRatingCount(response.data.data.ratingCount);
      }
    } catch (err) {
      setError("Failed to fetch average rating.");
      console.error(err);
    }
  }, [itemId, onModel]); 

  useEffect(() => {
    fetchAverageRating();
  }, [fetchAverageRating]); 
  const ratingChanged = (newRating) => {
    setRatingValue(newRating);
    handleSubmit(newRating);
  };

  const handleSubmit = async (newRating) => {
    setError(null);
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
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAverageRating();
  }, [fetchAverageRating]);

  return (
    <div>
      
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

            <p>Rating: {averageRating.toFixed(1)} out of 5</p>
            <p>
              ({ratingCount} {ratingCount === 1 ? "vote" : "votes"})
            </p>
          </div>
        )}
      </div>
      <div>
        <h3>Rate this {onModel}:</h3>
        {error && <p className="error">{error}</p>}
        <Rating
          count={5}
          onChange={ratingChanged}
          size={40}
          isHalf={true}
          activeColor="#ffd700"
          value={ratingValue}
          minValue={1}           
        />
      </div>
    </div>
  );
};

RatingSystem.propTypes = {
  itemId: PropTypes.string.isRequired,
  onModel: PropTypes.string.isRequired,
};

export default RatingSystem;
