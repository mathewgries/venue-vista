import React from 'react'

export const UserNameDisplay = ({username}) => {
    const {firstName, middleName, lastName} = username

    return (
        <div className='username-display'>
            <p>{firstName}</p>
            <p>{middleName ?? ''}</p>
            <p>{lastName ?? ''}</p>
        </div>
    )
}