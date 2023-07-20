import React from 'react'
import { TextInput } from '../../../../../components/inputFields/TextInput'

export const EditLocation = ({ address, handleObjOnChange }) => {
    return (
        <div className='bio-edit-form-section'>
            <div>
                <h5>
                    Location
                </h5>
            </div>

            <div className='bio-edit-form-input'>
                <TextInput
                    fieldName={'street'}
                    fieldValue={address.street}
                    placeholder={'Street Adress...'}
                    handleOnChange={(e) => handleObjOnChange(e, 'address')}
                />
            </div>

            <div className='bio-edit-form-input'>
                <TextInput
                    fieldName={'city'}
                    fieldValue={address.city}
                    placeholder={'City...'}
                    handleOnChange={(e) => handleObjOnChange(e, 'address')}
                />
            </div>

            <div className='bio-edit-form-input'>
                <TextInput
                    fieldName={'state'}
                    fieldValue={address.state}
                    placeholder={'State...'}
                    handleOnChange={(e) => handleObjOnChange(e, 'address')}
                />
            </div>

            <div className='bio-edit-form-input'>
                <TextInput
                    fieldName={'zipCode'}
                    fieldValue={address.zipCode}
                    placeholder={'Zipcode...'}
                    handleOnChange={(e) => handleObjOnChange(e, 'address')}
                />
            </div>

        </div>
    )
}