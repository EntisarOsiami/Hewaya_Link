import PropTypes from 'prop-types';


function CardContainer({ className = '', title, description, cardIndex, openModal }) {  
    const finalImageUrl = `https://source.unsplash.com/featured/?${title},${cardIndex}`;

    return (
      
      
            <div className={`CardContainer ${className}`}>
                <div onClick={() => openModal(finalImageUrl)}>
                    <img 
                        src={finalImageUrl}      
                        loading="lazy" 
                        alt={title} 
                        className="CardContainer-img"
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src="path/to/default/image.jpg";
                        }}
                    />
                </div>
                <div className="card-content">
                   <p className="card-description">{description}</p>
                </div>
            </div>
      
    );
}

CardContainer.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cardIndex: PropTypes.number.isRequired,
    openModal: PropTypes.func.isRequired
};

export default CardContainer;
