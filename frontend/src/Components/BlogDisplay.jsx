import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Comment from './createComment.jsx'; 
import Ratings from './createRating.jsx'; 

const BlogDisplay = ({ blogId }) => {
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const [blogResponse, commentsResponse, ratingsResponse] = await Promise.all([
                    axios.get(`/api/blogs/${blogId}`),
                    axios.get(`/api/comments/${blogId}`),
                    axios.get(`/api/ratings/${blogId}`)
                ]);

                if (isMounted) {
                    setBlog(blogResponse.data.blogs);
                    setComments(commentsResponse.data.comments);
                    setRatings(ratingsResponse.data.ratings);
                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    console.error(error);
                    setError(error.response ? error.response.data.message : "An error occurred while fetching data.");
                }
            }
        };

        fetchData();

        return () => isMounted = false; 
    }, [blogId]);

    const handleNewComment = (newComment) => {
        setComments(prevComments => [...prevComments, newComment]);
    };

    const handleNewRating = (newRating) => {
        setRatings(prevRatings => [...prevRatings, newRating]);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {blog && (
                <div>
                    <h2>{blog.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    <p>Author: {blog.author.username}</p> 
                    <ul>
                        {blog.tags.map(tag => <li key={tag}>{tag}</li>)}
                    </ul>
                    <section>
                        <h3>Comments:</h3>
                        {comments.map(comment => (
                            <div key={comment._id}>
                                {comment.text} - {comment.author}
                            </div>
                        ))}
                        <Comment blogId={blogId} onNewComment={handleNewComment} />
                    </section>
                    <section>
                        <h3>Ratings:</h3>
                        {ratings.map(rating => (
                            <div key={rating._id}>
                                {rating.value} - {rating.author}
                            </div>
                        ))}
                        <Ratings blogId={blogId} onNewRating={handleNewRating} />
                    </section>
                </div>
            )}
        </div>
    );
};

BlogDisplay.propTypes = {
    blogId: PropTypes.string,
};

export default BlogDisplay;
