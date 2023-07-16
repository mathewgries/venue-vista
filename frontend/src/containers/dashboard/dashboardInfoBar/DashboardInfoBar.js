import React from 'react'
import { UserNameDisplay } from './UserNameDisplay'
import './dashboardInfoBar.css'

export const DashboardInfoBar = (props) => {
    const { profile } = props

    return (
        <div className='dashboard-info-bar'>
            <UserNameDisplay username={profile.UserName} />
        </div>
    )
}