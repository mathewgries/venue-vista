import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../../redux/slices/userSlice'
import { onError } from "../../lib/errorLib";
import { DashboardInfoBar } from './dashboardInfoBar/DashboardInfoBar'
import { DashboardFeedSelector } from './dashboardFeedSelector/DashboardFeedSelector'
import { DashboardFeedDisplay } from './dashboardFeeds/DashboardFeedDisplay'
import "./dashboard.css";

export default function Dashboard() {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.user.status);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFeed, setSelectedFeed] = useState('feed_1')

  useEffect(() => {
    if (status === "idle") {
      loadUser()
    } else if (status === "success") {
      setIsLoading(false)
    }
  }, [status, isLoading]);

  async function loadUser() {
    setIsLoading(true)
    try {
      await dispatch(fetchUser()).unwrap()
    } catch (error) {
      onError(error);
    } finally {
      setIsLoading(false)
    }
  }

  function handleFeedChange(val) {
    setSelectedFeed(val)
  }

  if (isLoading) {
    return "...Loading"
  }

  return (
    <div className="dashboard">

      <div className='dashboard-info-bar-container'>
        <DashboardInfoBar />
      </div>

      <div className='dashboard-feed-selector-container'>
        <DashboardFeedSelector handleFeedChange={handleFeedChange} />
      </div>

      <div className='dashboard-feed-display-container'>
        <DashboardFeedDisplay
          selectedFeed={selectedFeed}
          isLoading={isLoading}
        />
      </div>

    </div>
  );
}


