import React from 'react'
import { DateInput } from '../../../../../components/inputFields/DateInput'

export const EditBirthdate = ({ birthdate, handleOnChange }) => {
    return (
        <div className='bio-edit-form-section'>
            <div>
                <h5>Birthdate</h5>
            </div>

            <div className='bio-edit-form-input'>
                <DateInput
                    fieldName={'birthdate'}
                    fieldValue={birthdate}
                    handleOnChange={(e) => handleOnChange(e)}
                />
            </div>
        </div>
    )
}