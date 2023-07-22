import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useLoadingContext } from "../../lib/LoadingContext";
import { fetchUser } from '../../redux/slices/userSlice'
import { onError } from "../../lib/errorLib";
import { InfoBar } from "../mainSections/InfoBar";
import { ActionBar } from "../mainSections/ActionBar";
import { MainContent } from "../mainSections/MainContent";
import { DashboardInfoBar } from './dashboardInfoBar/DashboardInfoBar'
import { DashboardFeedSelector } from './dashboardFeedSelector/DashboardFeedSelector'
import { DashboardFeedDisplay } from './dashboardFeeds/DashboardFeedDisplay'
import { LoadingScreen } from "../../components/LoadingScreen"
import "./dashboard.css";

export default function Dashboard() {
  const dispatch = useDispatch()
  const status = useSelector((state) => state.user.status);
  const { isLoading, setIsLoading } = useLoadingContext()
  const [selectedFeed, setSelectedFeed] = useState('feed_1')

  useEffect(() => {
    setIsLoading(true)
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
    return <LoadingScreen />
  }

  return (
    <div className="dashboard">

      <InfoBar>
        <DashboardInfoBar />
      </InfoBar>

      <ActionBar>
        <DashboardFeedSelector handleFeedChange={handleFeedChange} />
      </ActionBar>

      <MainContent>
        <DashboardFeedDisplay
          selectedFeed={selectedFeed}
          isLoading={isLoading}
        />
      </MainContent>

    </div>
  );
}


