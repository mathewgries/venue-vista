import React from 'react'

export const Location = ({ address }) => {
    return (
        <div className='bio-feed-loction bio-feed-details-item'>
            <h6>Location:</h6>
            <p>{address.City}, {address.State}</p>
        </div>
    )
}