import React from 'react'
import './inputFields.css'

export const PhoneNumberInput = (props) => {
    const { 
        field_label, 
        field_name, 
        field_value, 
        handleOnChange 
    } = props

    return (
        <div className='form-group'>
            <label>{field_label}</label>
            <input
                type='email'
                className='custom-input text-input-field'
                name={field_name}
                value={field_value ?? ''}
                onChange={(e) => handleOnChange(e)}
            />
        </div>
    )
}