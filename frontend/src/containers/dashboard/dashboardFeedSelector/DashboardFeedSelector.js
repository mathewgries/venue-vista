import React from "react";
import { Link } from 'react-router-dom'
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "../../../redux/slices/userSlice";
import './dashboardFeedSelector.css'

export const DashboardFeedSelector = (props) => {
    const { handleFeedChange } = props
    const id = useSelector(selectUser).EntityId

    function handleOnClick(value) {
        handleFeedChange(value)
    }

    return (
        <div className='feed-selector'>
            {/* <div className='feed-selector-item' onClick={() => handleOnClick('feed_1')}>
                <p>Bio</p>
            </div> */}
            <div className='feed-selector-item' onClick={() => handleOnClick('feed_1')}>
                <Link to={`/dashboard/${id}/bio`}>Bio</Link>
            </div>
            <div className='feed-selector-item' onClick={() => handleOnClick('feed_2')}>
                <p>Events</p>
            </div>
            <div className='feed-selector-item' onClick={() => handleOnClick('feed_3')} >
                <p>Pics</p>
            </div>
            <div className='feed-selector-item' onClick={() => handleOnClick('feed_4')}>
                <p>Posts</p>
            </div>
            <div className='feed-selector-item' onClick={() => handleOnClick('feed_5')}>
                <p>Follows</p>
            </div>
        </div>
    )
}