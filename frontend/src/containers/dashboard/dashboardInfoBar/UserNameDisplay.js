import React from 'react'

export const UserNameDisplay = (props) => {
    const {FirstName, MiddleName, LastName} = props.username

    return (
        <div className='username-display'>
            <p>{FirstName}</p>
            <p>{MiddleName ?? ''}</p>
            <p>{LastName ?? ''}</p>
        </div>
    )
}