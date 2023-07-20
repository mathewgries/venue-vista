import React from 'react'
import './inputFields.css'

export const TextAreaInput = (props) => {
    const {
        fieldLabel,
        fieldName,
        fieldValue,
        rows,
        handleOnChange
    } = props

    return (
        <div className='form-group'>
            <label>{fieldLabel}</label>
            <textarea
                className='custom-input text-input-field'
                type='text'
                rows={rows}
                name={fieldName}
                value={fieldValue ?? ''}
                onChange={(e) => handleOnChange(e)}
            />
        </div>
    )
}