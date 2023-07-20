import React from 'react'
import { TextAreaInput } from '../../../../../components/inputFields/TextAreaInput'

export const EditProfileBiography = ({ biography, handleOnChange }) => {
    return (
        <div className='bio-edit-form-section'>
            <div>
                <h5>Biography</h5>
            </div>
            
            <div className='bio-edit-form-input'>
                <TextAreaInput
                    // fieldLabel={'Biography'}
                    fieldName={'biography'}
                    fieldValue={biography}
                    rows={5}
                    handleOnChange={(e) => handleOnChange(e)}
                />
            </div>
        </div>
    )
}