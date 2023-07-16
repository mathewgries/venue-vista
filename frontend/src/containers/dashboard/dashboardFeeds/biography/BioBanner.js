import React from 'react'
import { BioBannerProfileImage } from './BioBannerProfileImage'
import { BioBannerBannerImage } from './BioBannerBannerImage'

export default function BioBanner(props) {
    const { profile } = props

    return (
        <div className='bio-feed-banner'>
            <BioBannerProfileImage profile={profile} />
            <BioBannerBannerImage profile={profile} />
        </div>
    )
}