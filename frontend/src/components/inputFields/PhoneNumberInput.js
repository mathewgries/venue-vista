import React from 'react'
import './inputFields.css'

export const PhoneNumberInput = (props) => {
    const { fieldLabel, fieldName, fieldValue, handleOnChange, placeholder } = props

    return (
        <div className='form-group'>
            {placeholder && <label>{fieldLabel}</label>}
            <input
                type='email'
                className='custom-input text-input-field'
                name={fieldName}
                value={fieldValue ?? ''}
                placeholder={placeholder ?? ''}
                onChange={(e) => handleOnChange(e)}
            />
        </div>
    )
}