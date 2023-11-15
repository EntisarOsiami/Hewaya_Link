
import PropTypes from 'prop-types';

function ImageModal({ isOpen, imageSrc, onClose }) {
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
            {isOpen && <img src={imageSrc} alt="Modal Content" className="modal-image" />}
        </div>
    );
}

ImageModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    imageSrc: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};

export default ImageModal;
