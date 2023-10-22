import PropTypes from 'prop-types';

const hobbies = [
    {title: "Photography", description: "Capturing the moments of today that will wow your heart tomorrow."},
    {title: "Cooking", description: "Where there’s smoke, there’s dinner."},
    {title: "Painting", description: "Every artist dips his brush in his own soul."},
    {title: "Gardening", description: "To plant a garden is to believe in tomorrow."},
    {title: "Traveling", description: "Exploring new places and meeting new faces."}
];

function getRandomHobby() {
    const randomIndex = Math.floor(Math.random() * hobbies.length);
    return hobbies[randomIndex];
}

function getRandomImageUrl(keyword) {
    return `https://source.unsplash.com/featured/?${keyword}`;
}

function CardContainer({ className, title, description, imageUrl }) {
    const hobby = title && description ? { title, description } : getRandomHobby();
    const finalImageUrl = imageUrl ? imageUrl : getRandomImageUrl(hobby.title);

    return (
        <div className={`${className} card-container`}>
            <img src={finalImageUrl} alt={hobby.title} className="card-image"/>
            <div className="card-content">
                <h3 className="card-title">{hobby.title}</h3>
                <p className="card-description">{hobby.description}</p>
            </div>
        </div>
    );
}

CardContainer.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
};

export default CardContainer;
