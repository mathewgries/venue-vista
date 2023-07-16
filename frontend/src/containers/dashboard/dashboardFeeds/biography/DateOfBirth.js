import React from 'react'

export const DateOfBirth = ({ date_of_birth }) => {
    return (
        <div className='bio-feed-date-of-birth bio-feed-details-item'>
            <h6>Date of Birth:</h6>
            <p>{date_of_birth}</p>
        </div>
    )


}