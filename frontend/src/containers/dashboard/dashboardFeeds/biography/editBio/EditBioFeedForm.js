import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../../../../redux/slices/userSlice'
import { onError } from '../../../../../lib/errorLib'
import { Form } from "react-bootstrap";
import { EditBioButtonGroup } from './EditBioButtonGroup';
import { EditUseranme } from './EditUsername';
import { EditProfileBiography } from './EditProfileBiography';
import { EditLocation } from './EditLocation';
import { EditBirthdate } from './EditBirthdate';
import { EditContactInfo } from './EditContactInfo';
import { CreateNewContact } from './CreateNewContact';
import { CreateNewContactButton } from './CreateNewContactButton';
import { CreateNewSiteLink } from './CreateNewSiteLink';
import { CreateNewSiteLinkButton } from './CreateNewSiteLinkButton';
import { EditSiteLinks } from './EditSiteLinks';
import './editBio.css'

export const EditBioFeedForm = (props) => {
    const dispatch = useDispatch()
    const { profile, toggleEdit } = props
    const [isLoading, setIsLoading] = useState(false);
    const [fields, setFields] = useState({ ...profile });

    const [isCreateNewContact, setIsCreateNewContact] = useState(false)
    const [contact, setContact] = useState({ type: '', value: '' })
    const [isContactValid, setIsContactValid] = useState(true);

    const [isCreateNewSiteLink, setIsCreateNewSiteLink] = useState(false)
    const [siteLink, setSiteLink] = useState('')

    function validateForm() {
        return fields.username.firstName.length > 0;
    }

    // SHARED ON CHANGES
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFields((prev) => ({ ...prev, [name]: value }))
    }

    const handleObjOnChange = (e, parentProperty) => {
        const { name, value } = e.target
        setFields((prev) => ({
            ...prev,
            [parentProperty]: { ...prev[parentProperty], [name]: value },
        }))
    }

    // CONTACT ON CHANGES
    // Update existing ContactInfo item
    const handleNestedContactChange = (e, index) => {
        const { value } = e.target;
        setFields((prev) => {
            const updatedArray = prev.contactInfo.map((item, i) => {
                if (i === index) {
                    return { ...item, value: value };
                }
                return item;
            });
            return { ...prev, contactInfo: updatedArray };
        });
    };

    // Remove exising ContactInfo item
    const handleRemoveContact = (index) => {
        const updatedArray = fields.contactInfo.filter((_, i) => i !== index);
        setFields((prev) => ({ ...prev, contactInfo: updatedArray }));
    };

    // Update contact state value
    const handleContactOnChange = (e) => {
        const { name, value } = e.target
        setContact((prev) => ({ ...prev, [name]: value }));

        let isValid;
        if (contact.type === 'phoneNumber') {
            isValid = validatePhoneNumber(value);
        } else if (contact.type === 'emailAddress') {
            isValid = validateEmail(value);
        }
        setIsContactValid(isValid);
    };

    // Add new ContactInfo item to fields
    const handleAddNewContact = () => {
        const updatedContactInfo = [...fields.contactInfo, contact]
        setFields((prev) => ({ ...prev, contactInfo: updatedContactInfo }))
        handleResetContact()
    }

    // Reset the state of contact
    const handleResetContact = () => {
        setContact({ type: '', value: '' })
        setIsCreateNewContact(!isCreateNewContact)
    }

    // SITE LINKS
    // Update existing SiteLinks item
    const handleNestedArrayChange = (e, index) => {
        const { value } = e.target;
        setFields((prev) => {
            const updatedArray = [...prev.siteLinks];
            updatedArray[index] = value;
            return { ...prev, siteLinks: updatedArray };
        });
    };

    // Remove existing Site Link
    const handleRemoveSiteLink = (index) => {
        const updatedArray = fields.siteLinks.filter((_, i) => i !== index);
        setFields((prev) => ({ ...prev, siteLinks: updatedArray }));
    };

    // Add new SiteLinks item to fields
    const handleAddNewSiteLink = () => {
        const updatedSiteLinks = [...fields.siteLinks, siteLink]
        setFields((prev) => ({ ...prev, siteLinks: updatedSiteLinks }))
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
        <div className="bio-feed-edit-container">
            <EditBioButtonGroup
                isLoading={isLoading}
                validateForm={validateForm}
                handleSumbit={handleSumbit}
                toggleEdit={toggleEdit}
            />

            <div className='bio-feed-form-container'>
                <Form>
                    <EditUseranme
                        username={fields.username}
                        handleObjOnChange={handleObjOnChange}
                    />

                    <EditProfileBiography
                        biography={fields.biography}
                        handleOnChange={handleOnChange}
                    />

                    <EditLocation
                        address={fields.address}
                        handleObjOnChange={handleObjOnChange}
                    />

                    <EditBirthdate
                        birthdate={fields.birthdate}
                        handleOnChange={handleOnChange}
                    />

                    <EditContactInfo
                        contactInfo={fields.contactInfo}
                        handleNestedContactChange={handleNestedContactChange}
                        handleRemoveContact={handleRemoveContact}
                    />

                    <CreateNewContact
                        isCreateNewContact={isCreateNewContact}
                        contact={contact}
                        handleContactOnChange={handleContactOnChange}
                        handleAddNewContact={handleAddNewContact}
                        handleResetContact={handleResetContact}
                    />

                    <CreateNewContactButton
                        isCreateNewContact={isCreateNewContact}
                        setIsCreateNewContact={setIsCreateNewContact}
                    />

                    <EditSiteLinks
                        siteLinks={fields.siteLinks}
                        handleNestedArrayChange={handleNestedArrayChange}
                        handleRemoveSiteLink={handleRemoveSiteLink}
                    />

                    <CreateNewSiteLink
                        isCreateNewSiteLink={isCreateNewSiteLink}
                        siteLink={siteLink}
                        setSiteLink={setSiteLink}
                        handleAddNewSiteLink={handleAddNewSiteLink}
                        handleResetSiteLink={handleResetSiteLink}
                        setIsCreateNewSiteLink={setIsCreateNewSiteLink}
                    />

                    <CreateNewSiteLinkButton
                        isCreateNewSiteLink={isCreateNewSiteLink}
                        setIsCreateNewSiteLink={setIsCreateNewSiteLink}
                    />

                </Form>
            </div>
        </div>
    )
}