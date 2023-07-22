import React from 'react'
import './mainSections.css'

export const InfoBar = ({ children }) => {
    return (
        <div className='info-bar-container'>
            {children}
        </div>
    )
}