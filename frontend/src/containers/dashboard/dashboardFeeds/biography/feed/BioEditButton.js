import React from 'react'

export const BioEditButton = (props) => {
    const { toggleEdit } = props

    return (
        <div className='bio-feed-details-item'>
            <button className='btn btn-link' onClick={toggleEdit}>
                Edit bio
            </button>
        </div>
    )
}