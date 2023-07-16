import React from 'react'

export const ProfileList = ({ profiles }) => {
    return (
        <div className='bio-feed-details-item'>
            <h6>Profiles:</h6>
            {
                profiles.map((profile, index) => (
                    <div className='bio-feed-profile-links' key={index}>
                        <p>{profile}</p>
                    </div>
                ))
            }
        </div>
    )
}