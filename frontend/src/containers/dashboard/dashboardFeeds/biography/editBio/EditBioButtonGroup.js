import React from 'react'

export const EditBioButtonGroup = ({ validateForm, handleSumbit, toggleEdit }) => {
    return (
        <div className='edit-button-group'>
            <button className='bio-save-button' disabled={!validateForm()} onClick={handleSumbit}>
                Save
            </button>
            <button className='bio-edit-button' onClick={toggleEdit}>
                Back
            </button>
        </div>
    )
}