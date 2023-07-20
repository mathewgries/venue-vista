import React from 'react'
import StarRatings from 'react-star-ratings';

export const ProfileRating = (props) => {
    const rating = 3;
    
    return (
        <div className='bio-feed-rating bio-feed-details-item'>
            <h6>Rating:</h6>
            <div>
                <StarRatings
                    rating={rating}
                    starRatedColor="gold"
                    starEmptyColor="gray"
                    starDimension="20px"
                    starSpacing="2px"
                />
            </div>
        </div>
    )
}