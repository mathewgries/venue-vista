import React from 'react'
import './mainSections.css'

export const MainContent = ({ children }) => {
    return (
        <div className='main-content-container'>
            {children}
        </div>
    )
}