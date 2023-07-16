import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../../../redux/slices/userSlice'
import { onError } from '../../../../lib/errorLib'
import { Form, Button } from "react-bootstrap";
import { TextInput } from '../../../../components/inputFields/TextInput';
import { TextAreaInput } from '../../../../components/inputFields/TextAreaInput';
import { DateInput } from '../../../../components/inputFields/DateInput';
import { EmailAddressInput } from '../../../../components/inputFields/EmailAddressInput';
import { PhoneNumberInput } from '../../../../components/inputFields/PhoneNumberInput';
import LoaderButton from "../../../../components/LoaderButton"

export default function EditBioFeed(props) {
    const dispatch = useDispatch()
    const { profile, toggleEdit } = props
    const [isLoading, setIsLoading] = useState(false);
    const [fields, setFields] = useState({ ...profile });
    const [isCreateNewContact, setIsCreateNewContact] = useState(false)
    const [contact, setContact] = useState({ Type: '', Value: '' })
    const [isCreateNewSiteLink, setIsCreateNewSiteLink] = useState(false)
    const [siteLink, setSiteLink] = useState('')
    const [isContactValid, setIsContactValid] = useState(true);

    function validateForm() {
        return fields.UserName.FirstName.length > 0;
    }

    // SHARED ON CHANGES
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFields((prev) => ({ ...prev, [name]: value }))
    }

    const handleObjOnChange = (e, parent_prop) => {
        const { name, value } = e.target
        setFields((prev) => ({
            ...prev,
            [parent_prop]: { ...prev[parent_prop], [name]: value },
        }))
    }

    // CONTACT ON CHANGES
    // Update existing ContactInfo item
    const handleNestedContactChange = (e, index) => {
        const { value } = e.target;
        setFields((prev) => {
            const updatedArray = prev.ContactInfo.map((item, i) => {
                if (i === index) {
                    return { ...item, Value: value };
                }
                return item;
            });
            return { ...prev, ContactInfo: updatedArray };
        });
    };

    // Remove exising ContactInfo item
    const handleRemoveContact = (index) => {
        const updatedArray = fields.ContactInfo.filter((_, i) => i !== index);
        setFields((prev) => ({
            ...prev,
            ContactInfo: updatedArray,
        }));
    };

    // Update contact state value
    const handleContactOnChange = (e) => {
        const { name, value } = e.target
        setContact((prev) => ({ ...prev, [name]: value }));

        let isValid;
        if (contact.Type === 'PhoneNumber') {
            isValid = validatePhoneNumber(value);
        } else if (contact.Type === 'EmailAddress') {
            isValid = validateEmail(value);
        }
        setIsContactValid(isValid);
    };

    // Add new ContactInfo item to fields
    const handleAddNewContact = () => {
        const updatedContactInfo = [...fields.ContactInfo, contact]
        setFields((prev) => ({
            ...prev,
            ContactInfo: updatedContactInfo
        }))
        handleResetContact()
    }

    // Reset the state of contact
    const handleResetContact = () => {
        setContact({ Type: '', Value: '' })
        setIsCreateNewContact(!isCreateNewContact)
    }

    // SITE LINKS
    // Update existing SiteLinks item
    const handleNestedArrayChange = (e, index) => {
        const { value } = e.target;
        setFields((prev) => {
            const updatedArray = [...prev.SiteLinks]; // Create a new array to avoid mutating the original array
            updatedArray[index] = value; // Update the value at the specified index
            return {
                ...prev,
                SiteLinks: updatedArray,
            };
        });
    };

    // Remove existing Site Link
    const handleRemoveSiteLink = (index) => {
        const updatedArray = fields.SiteLinks.filter((_, i) => i !== index);
        setFields((prev) => ({
            ...prev,
            SiteLinks: updatedArray,
        }));
    };

    // Add new SiteLinks item to fields
    const handleAddNewSiteLink = () => {
        const updatedSiteLinks = [...fields.SiteLinks, siteLink]
        setFields((prev) => ({
            ...prev,
            SiteLinks: updatedSiteLinks
        }))
        handleResetSiteLink()
    }

    // Reset the state of siteLink
    const handleResetSiteLink = () => {
        setSiteLink('')
        setIsCreateNewSiteLink(!isCreateNewSiteLink)
    }

    const validatePhoneNumber = (phoneNumber) => {
        // Perform phone number validation logic here
        return true; // Replace with your validation logic
    };

    const validateEmail = (email) => {
        // Perform email validation logic here
        return true; // Replace with your validation logic
    };

    async function handleSumbit(e) {
        e.preventDefault()

        setIsLoading(true)
        try {
            await dispatch(updateUser(fields)).unwrap()
        } catch (e) {
            onError(e)
        }
        setIsLoading(false)
    }

    return (
        <div className="bio-feed-edit">

            <div className='edit-button-group'>
                <LoaderButton
                    block="true"
                    size="sm"
                    type="submit"
                    className={'edit-save-button'}
                    isLoading={isLoading}
                    disabled={!validateForm()}
                    onClick={handleSumbit}
                >
                    Save Changes
                </LoaderButton>
                <button onClick={toggleEdit}>
                    Back
                </button>
            </div>

            <div className='bio-feed-form-container'>
                <Form>
                    {/* USERNAME */}
                    <div>
                        <TextInput
                            field_name={'FirstName'}
                            field_label={'First Name'}
                            field_value={fields.UserName.FirstName}
                            handleOnChange={(e) => handleObjOnChange(e, 'UserName')}
                        />

                        <TextInput
                            field_name={'MiddleName'}
                            field_label={'Middle Name'}
                            field_value={fields.UserName.MiddleName}
                            handleOnChange={(e) => handleObjOnChange(e, 'UserName')}
                        />

                        <TextInput
                            field_name={'LastName'}
                            field_label={'Last Name'}
                            field_value={fields.UserName.LastName}
                            handleOnChange={(e) => handleObjOnChange(e, 'UserName')}
                        />
                    </div>

                    {/* BIOGRAPHY */}
                    <div>
                        <TextAreaInput
                            field_name={'Biography'}
                            field_label={'Biography'}
                            field_value={fields.Biography}
                            rows={5}
                            handleOnChange={(e) => handleOnChange(e)}
                        />
                    </div>


                    {/* ADDRESS */}
                    <div>
                        <TextInput
                            field_name={'Street'}
                            field_label={'Street Address'}
                            field_value={fields.Address.Street}
                            handleOnChange={(e) => handleObjOnChange(e, 'Address')}
                        />

                        <TextInput
                            field_name={'City'}
                            field_label={'City'}
                            field_value={fields.Address.City}
                            handleOnChange={(e) => handleObjOnChange(e, 'Address')}
                        />

                        <TextInput
                            field_name={'State'}
                            field_label={'State'}
                            field_value={fields.Address.State}
                            handleOnChange={(e) => handleObjOnChange(e, 'Address')}
                        />

                        <TextInput
                            field_name={'ZipCode'}
                            field_label={'ZipCode'}
                            field_value={fields.Address.ZipCode}
                            handleOnChange={(e) => handleObjOnChange(e, 'Address')}
                        />
                    </div>


                    {/* DATE OF BIRTH */}
                    <div>
                        <DateInput
                            field_name={'DateOfBirth'}
                            field_label={'Birth Date'}
                            field_value={fields.DateOfBirth}
                            handleOnChange={(e) => handleOnChange(e)}
                        />
                    </div>

                    {/* CONTACT INFO */}
                    <div>
                        {
                            fields.ContactInfo.map((contact, index) => (
                                <div key={index}>
                                    {
                                        contact.Type === 'EmailAddress' &&
                                        <EmailAddressInput
                                            field_label={'EmailAddress'}
                                            field_name={'Value'}
                                            field_value={contact.Value}
                                            handleOnChange={(e) => handleNestedContactChange(e, index)}
                                        />
                                    }
                                    {
                                        contact.Type === 'PhoneNumber' &&
                                        <PhoneNumberInput
                                            field_label={'PhoneNumber'}
                                            field_name={'Value'}
                                            field_value={contact.Value}
                                            handleOnChange={(e) => handleNestedArrayChange(e, index)}
                                        />
                                    }
                                    <Button variant='danger' onClick={() => handleRemoveContact(index)}>
                                        Remove
                                    </Button>
                                </div>
                            ))}

                        {
                            isCreateNewContact &&
                            <div>
                                {/* CONTACT TYPE  */}
                                <Form.Group size="lg">
                                    <Form.Control
                                        as="select"
                                        name={'Type'}
                                        value={contact.Type}
                                        onChange={handleContactOnChange}
                                    >
                                        <option value="" disabled>Select Type</option>
                                        <option value="PhoneNumber">PhoneNumber</option>
                                        <option value="EmailAddress">EmailAddress</option>
                                    </Form.Control>
                                </Form.Group>

                                {/* EMAILADDRESS */}
                                {
                                    contact.Type === 'EmailAddress' &&
                                    <EmailAddressInput
                                        field_label={'EmailAddress'}
                                        field_name={'Value'}
                                        field_value={contact.Value}
                                        handleOnChange={(e) => handleContactOnChange(e)}
                                    />
                                }

                                {/* PHONE NUMBER */}
                                {
                                    contact.Type === 'PhoneNumber' &&
                                    <PhoneNumberInput
                                        field_label={'PhoneNumber'}
                                        field_name={'Value'}
                                        field_value={contact.Value}
                                        handleOnChange={(e) => handleContactOnChange(e)}
                                    />
                                }
                                <div>
                                    <Button variant='primary' onClick={handleAddNewContact}>
                                        Add
                                    </Button>
                                    <Button variant="primary" onClick={handleResetContact}>
                                        Cancel
                                    </Button>
                                </div>

                            </div>
                        }

                        {/* CREATE NEW FORM FIELD TO ENTER CONTACT INFO */}
                        {
                            !isCreateNewContact &&
                            <Button
                                variant="primary"
                                onClick={() => setIsCreateNewContact(!isCreateNewContact)}
                            >
                                Create New Contact
                            </Button>
                        }
                    </div>

                    {/* SITE LINKS */}
                    <div>
                        {
                            fields.SiteLinks.map((link, index) => (
                                <div key={index}>
                                    <TextInput
                                        field_value={link}
                                        handleOnChange={(e) => handleNestedArrayChange(e, index)}
                                    />
                                    <Button variant='danger' onClick={() => handleRemoveSiteLink(index)}>
                                        Remove
                                    </Button>
                                </div>
                            ))
                        }
                        {isCreateNewSiteLink &&
                            <div>
                                <TextInput
                                    field_label={'New Site Link'}
                                    field_name={'siteLink'}
                                    field_value={siteLink}
                                    handleOnChange={(e) => setSiteLink(e.target.value)}
                                />
                                <Button variant='primary' onClick={handleAddNewSiteLink}>
                                    Add
                                </Button>
                                <Button variant="primary" onClick={handleResetSiteLink}>
                                    Cancel
                                </Button>
                            </div>
                        }
                        {!isCreateNewSiteLink &&
                            <Button
                                variant="primary"
                                onClick={() => setIsCreateNewSiteLink(!isCreateNewSiteLink)}
                            >
                                Create New Site Link
                            </Button>
                        }
                    </div>
                </Form>
            </div>
        </div>
    )
}