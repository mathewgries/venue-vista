import React from 'react'

export const Birthdate = ({ birthdate }) => {
    return (
        <div className='bio-feed-date-of-birth bio-feed-details-item'>
            <h6>Birthdate:</h6>
            <p>{birthdate}</p>
        </div>
    )


}