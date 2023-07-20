import React from 'react'

export const CreateNewContactButton = ({ isCreateNewContact, setIsCreateNewContact }) => {
    return (
        <div>{
            !isCreateNewContact &&
            <button
                className="primary"
                onClick={() => setIsCreateNewContact(!isCreateNewContact)}
            >
                Create Contact
            </button>
        }</div>
    )
}