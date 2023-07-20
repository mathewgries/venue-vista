import React from 'react'
import { EmailAddressInput } from '../../../../../components/inputFields/EmailAddressInput'
import { PhoneNumberInput } from '../../../../../components/inputFields/PhoneNumberInput'

export const EditContactInfo = ({ contactInfo, handleNestedContactChange, handleRemoveContact }) => {

    const emailAddressesWithIndex = contactInfo
        .map((item, index) => {
            return { ...item, index };
        })
        .filter((item) => item.type === 'emailAddress');

    const phoneNumberWithIndex = contactInfo
        .map((item, index) => {
            return { ...item, index };
        })
        .filter((item) => item.type === 'phoneNumber');

    return (
        <div className='bio-edit-form-section'>
            <div>
                <h5>Contact</h5>
            </div>

            <div>
                {emailAddressesWithIndex.map((email) => (
                    <div className='bio-edit-form-input' key={email.index}>
                        <EmailAddressInput
                            fieldName={'value'}
                            fieldValue={email.value}
                            placeholder={'Enter email...'}
                            handleOnChange={(e) => handleNestedContactChange(e, email.index)}
                        />
                        <button className='danger' onClick={() => handleRemoveContact(email.index)}>
                            Remove
                        </button>
                    </div>

                ))}
            </div>

            <div>
                {phoneNumberWithIndex.map((phone) => (
                    <div className='bio-edit-form-input' key={phone.index}>
                        <PhoneNumberInput
                            fieldName={'value'}
                            fieldValue={phone.value}
                            placeholder={'Enter phonenumber...'}
                            handleOnChange={(e) => handleNestedContactChange(e, phone.index)}
                        />
                        <button className='danger' onClick={() => handleRemoveContact(phone.index)}>
                            Remove
                        </button>
                    </div>
                ))}
            </div>

        </div>
    )
}