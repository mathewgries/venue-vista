import React from 'react'

export const SiteLinks = ({ siteLinks }) => {
    return (
        <div className='bio-feed-details-item'>
            <h6>Site Links:</h6>
            {
                siteLinks.map((siteLink, index) => (
                    <div className='bio-feed-site-links' key={index}>
                        <p>{siteLink}</p>
                    </div>
                ))
            }
        </div>
    )
}