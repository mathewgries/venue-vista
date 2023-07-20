import React from 'react'
import { TextInput } from '../../../../../components/inputFields/TextInput'

export const EditUseranme = ({ username, handleObjOnChange }) => {
    return (
        <div className='bio-edit-form-section'>
            <div>
                <h5>Username</h5>
            </div>

            <div className='bio-edit-form-input'>
                <TextInput
                    fieldName={'firstName'}
                    fieldValue={username.firstName}
                    placeholder={'Firstname...'}
                    handleOnChange={(e) => handleObjOnChange(e, 'username')}
                />
            </div>

            <div className='bio-edit-form-input'>
                <TextInput
                    fieldName={'middleName'}
                    fieldValue={username.middleName}
                    placeholder={'Middlename...'}
                    handleOnChange={(e) => handleObjOnChange(e, 'username')}
                />
            </div>

            <div className='bio-edit-form-input'>
                <TextInput
                    fieldName={'lastName'}
                    fieldValue={username.lastName}
                    placeholder={'Lastname...'}
                    handleOnChange={(e) => handleObjOnChange(e, 'username')}
                />
            </div>
        </div>
    )
}