import React from 'react'
import { BioBannerProfileImage } from './BioBannerProfileImage'
import { BioBannerBannerImage } from './BioBannerBannerImage'
import './bioBanner.css'

export const BioBanner = (props) => {
    const { profile, toggleProfileImageUpload, toggleBannerImageUpload } = props

    return (
        <div className="bio-feed-banner-container">
            <div className='bio-feed-banner'>
                <BioBannerProfileImage
                    profile={profile}
                    toggleView={toggleProfileImageUpload}
                />
                <BioBannerBannerImage
                    profile={profile}
                    toggleView={toggleBannerImageUpload}
                />
            </div>
        </div>
    )
}