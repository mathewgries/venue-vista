import React from 'react'
import LoaderButton from "./../../../../../components/LoaderButton"

export const EditBioButtonGroup = ({isLoading, validateForm, handleSumbit, toggleEdit}) => {
    return (
        <div className='edit-button-group'>
            <LoaderButton
                block="true"
                size="sm"
                type="submit"
                className={'edit-save-button'}
                isLoading={isLoading}
                disabled={!validateForm()}
                onClick={handleSumbit}
            >
                Save Changes
            </LoaderButton>
            <button onClick={toggleEdit}>
                Back
            </button>
        </div>
    )
}