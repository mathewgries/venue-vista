import React from 'react'
import { Form } from 'react-bootstrap'
import { EmailAddressInput } from '../../../../../components/inputFields/EmailAddressInput'
import { PhoneNumberInput } from '../../../../../components/inputFields/PhoneNumberInput'

export const CreateNewContact = (props) => {
    const {
        isCreateNewContact,
        contact,
        handleContactOnChange,
        handleAddNewContact,
        handleResetContact
    } = props

    return (
        <div>{
            isCreateNewContact &&
            <div className='bio-edit-form-section'>

                <div className='bio-edit-form-input'>
                    {/* SELECT CONTACT TYPE  */}
                    <Form.Group size="lg">
                        <Form.Control
                            as="select"
                            name={'type'}
                            value={contact.type}
                            onChange={handleContactOnChange}
                        >
                            <option value="" disabled>Select Type</option>
                            <option value="phoneNumber">PhoneNumber</option>
                            <option value="emailAddress">EmailAddress</option>
                        </Form.Control>
                    </Form.Group>
                </div>


                <div className='bio-edit-form-input'>
                    {/* EMAILADDRESS */}
                    {
                        contact.type === 'emailAddress' &&
                        <EmailAddressInput
                            fieldLabel={'EmailAddress'}
                            fieldName={'value'}
                            fieldValue={contact.value}
                            handleOnChange={(e) => handleContactOnChange(e)}
                        />
                    }

                    {/* PHONE NUMBER */}
                    {
                        contact.type === 'phoneNumber' &&
                        <PhoneNumberInput
                            fieldLabel={'PhoneNumber'}
                            fieldName={'value'}
                            fieldValue={contact.value}
                            handleOnChange={(e) => handleContactOnChange(e)}
                        />
                    }
                </div>

                <div>
                    <button className='primary' onClick={handleAddNewContact}>
                        Add
                    </button>
                    <button className="primary" onClick={handleResetContact}>
                        Cancel
                    </button>
                </div>

            </div>
        }</div>
    )
}