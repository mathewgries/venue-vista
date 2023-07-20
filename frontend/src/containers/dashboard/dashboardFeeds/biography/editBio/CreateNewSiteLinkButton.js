import React from 'react'

export const CreateNewSiteLinkButton = ({ isCreateNewSiteLink, setIsCreateNewSiteLink }) => {
    return (
        <div>{
            !isCreateNewSiteLink &&
            <button
                className="primary"
                onClick={() => setIsCreateNewSiteLink(!isCreateNewSiteLink)}
            >
                Create New Site Link
            </button>
        }</div>
    )
}