import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Ratings({ blogId, onNewRating }) {
  const [ratingValue, setRatingValue] = useState(1);
  const [error, setError] = useState(null);

  // Extract username from Redux store
  const username = useSelector(state => state.profile.user.username);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/ratings/${blogId}`, {
        value: ratingValue,
        author: username,
      });
      onNewRating(response.data.data);
      setRatingValue(1);  // Reset to default
    } catch (err) {
      setError("Failed to post the rating.");
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Rate this Blog:</h3>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <select 
          value={ratingValue} 
          onChange={(e) => setRatingValue(Number(e.target.value))}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button type="submit">Rate</button>
      </form>
    </div>
  );
}
Ratings.propTypes = {
  blogId: PropTypes.string.isRequired,
  onNewRating: PropTypes.func.isRequired,
};
export default Ratings;