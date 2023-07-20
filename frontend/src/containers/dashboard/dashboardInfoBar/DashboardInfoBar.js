import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../../redux/slices/userSlice'
import { UserNameDisplay } from './UserNameDisplay'
import './dashboardInfoBar.css'

export const DashboardInfoBar = () => {
    const profile = useSelector(selectUser)

    return (
        <div className='dashboard-info-bar'>
            <UserNameDisplay username={profile.username}/>
        </div>
    )
}