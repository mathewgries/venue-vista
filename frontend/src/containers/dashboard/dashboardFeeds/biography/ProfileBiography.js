import React from 'react'

export const ProfileBiography = ({ biography, togglePopup }) => {

    return (
        <div className='bio-feed-bio bio-feed-details-item'>
            <h6>Biography:</h6>
            <div className='bio-content'>
                <p>
                    {biography}
                </p>
            </div>
            <button className="see-more" onClick={togglePopup}>See More</button>
        </div>
    )
}