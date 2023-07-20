import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

export const CameraButton = (props) => {
    const { toggleView } = props
    
    return (
        <button className="upload-button" onClick={toggleView}>
            <FontAwesomeIcon icon={faCamera} />
        </button>
    )
}