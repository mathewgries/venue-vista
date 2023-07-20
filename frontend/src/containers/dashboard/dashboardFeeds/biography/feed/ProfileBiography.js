import React from 'react'

export const ProfileBiography = ({ biography, toggleBioPopup }) => {
    return (
        <div className='bio-feed-bio bio-feed-details-item'>
            <h6>Biography:</h6>
            <div className='bio-content'>
                <p>
                    {biography}
                </p>
            </div>
            <button className="see-more" onClick={toggleBioPopup}>See More</button>
        </div>
    )
}