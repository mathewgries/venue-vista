import React from 'react'
import './inputFields.css'

export const TextAreaInput = (props) => {
    const { 
        field_label, 
        field_name, 
        field_value,
        rows,
        handleOnChange 
    } = props

    return (
        <div className='form-group'>
            <label>{field_label}</label>
            <textarea
                type='text'
                rows={rows}
                className='custom-input text-input-field'
                name={field_name}
                value={field_value ?? ''}
                onChange={(e) => handleOnChange(e)}
            />
        </div>
    )
}