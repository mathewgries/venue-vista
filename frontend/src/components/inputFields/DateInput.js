import React from 'react'
import './inputFields.css'

export const DateInput = (props) => {
    const { 
        fieldLabel, 
        fieldName, 
        fieldValue, 
        handleOnChange 
    } = props

    return (
        <div className='form-group'>
            <label>{fieldLabel}</label>
            <input
                type='date'
                className='custom-input text-input-field'
                name={fieldName}
                value={fieldValue ?? ''}
                onChange={(e) => handleOnChange(e)}
            />
        </div>
    )
}