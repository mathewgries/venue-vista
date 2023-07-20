import React from 'react'
import BioFeed from './biography/feed/BioFeed'
import PictureGalleryFeed from './picture-gallery/PictureGalleryFeed'
import PostsFeed from './posts/PostsFeed'
import EventsFeed from './events/EventsFeed'
import FollowsFeed from './followers/FollowsFeed'

export const DashboardFeedDisplay = (props) => {
    const { selectedFeed, profile } = props

    function displayFeed() {
        if (selectedFeed === 'feed_1') {
            return <BioFeed profile={profile} />
        } else if (selectedFeed === 'feed_2') {
            return <EventsFeed />
        } else if (selectedFeed === 'feed_3') {
            return <PictureGalleryFeed />
        } else if (selectedFeed === 'feed_4') {
            return <PostsFeed />
        } else if (selectedFeed === 'feed_5') {
            return <FollowsFeed />
        }
    }

    return (
        <div className='dashboard-feed-display'>
            {displayFeed()}
        </div>
    )
}