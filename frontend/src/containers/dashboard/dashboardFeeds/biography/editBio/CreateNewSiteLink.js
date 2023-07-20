import React from 'react'
import { TextInput } from '../../../../../components/inputFields/TextInput'

export const CreateNewSiteLink = (props) => {
    const {
        isCreateNewSiteLink,
        siteLink,
        setSiteLink,
        handleAddNewSiteLink,
        handleResetSiteLink
    } = props

    return (
        <div>{
            isCreateNewSiteLink &&
            <div>
                <TextInput
                    fieldLabel={'New Site Link'}
                    fieldName={'siteLink'}
                    fieldValue={siteLink}
                    handleOnChange={(e) => setSiteLink(e.target.value)}
                />
                <button className='primary' onClick={handleAddNewSiteLink}>
                    Add
                </button>
                <button className="primary" onClick={handleResetSiteLink}>
                    Cancel
                </button>
            </div>
        }</div>
    )
}