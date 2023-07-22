import React from 'react'
import './mainSections.css'

export const ActionBar = ({ children }) => {
    return (
        <div className='action-bar-container'>
            {children}
        </div>
    )
}