import React from 'react'
import './inputFields.css'

export const TextInput = (props) => {
    const { fieldLabel, fieldName, fieldValue, handleOnChange, placeholder } = props

    return (
        <div className='form-group'>
            {fieldLabel && <label>{fieldLabel}</label>}
            <input
                className='custom-input text-input-field'
                name={fieldName ?? ''}
                value={fieldValue ?? ''}
                onChange={(e) => handleOnChange(e)}
                placeholder={placeholder ?? ''}
            />
        </div>
    )
}