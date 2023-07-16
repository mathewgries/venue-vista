import React from 'react'

export const SiteLinks = ({ site_links }) => {
    return (
        <div className='bio-feed-details-item'>
            <h6>Site Links:</h6>
            {
                site_links.map((site_link, index) => (
                    <div className='bio-feed-site-links' key={index}>
                        <p>{site_link}</p>
                    </div>
                ))
            }
        </div>
    )
}