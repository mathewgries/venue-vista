import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BioBanner from './BioBanner'
import EditBioFeed from './EditBioFeed';
import { ProfileRating } from './ProfileRating';
import { BioEditButton } from './BioEditButton';
import { ProfileBiography } from './ProfileBiography';
import { Location } from './Location';
import { DateOfBirth } from './DateOfBirth';
import { ContactInfo } from './ContactInfo';
import { SiteLinks } from './SiteLinks';
import { ProfileList } from './ProfileList';
import './biography.css'

export default function BioFeed(props) {
    const { profile } = props
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const isCurrentUserProfile = true;

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen)
    };

    const toggleEdit = () => {
        setIsEditOpen(!isEditOpen)
    }

    if (isPopupOpen) {
        return (
            <div className='feed-container bio-feed-container'>
                <div className="bio-feed-full-bio">
                    <div className="close-button">
                        <button onClick={togglePopup}>
                            X
                        </button>
                    </div>
                    <p className='full-bio-text'>
                        {profile.Biography}
                    </p>
                </div>
            </div>
        )
    }

    if (isEditOpen) {
        return (
            <div className='bio-feed-container'>
                <EditBioFeed profile={props.profile} toggleEdit={toggleEdit} />
            </div>
        )
    }

    return (
        <div className='feed-container bio-feed-container'>

            <div className="bio-feed-banner-container">
                <BioBanner profile={props.profile} />
            </div>
            
            {isCurrentUserProfile && <BioEditButton toggleEdit={toggleEdit} />}
            <ProfileRating />
            <ProfileBiography biography={profile.Biography} togglePopup={togglePopup} />
            <Location address={profile.Address} />
            <DateOfBirth date_of_birth={profile.DateOfBirth} />
            <ContactInfo contact_info={profile.ContactInfo} />
            <SiteLinks site_links={profile.SiteLinks} />
            <ProfileList profiles={profile.Profiles} />

            <div className='bio-feed-member-since bio-feed-details-item'>
                <h6>Member Since:</h6>
                <p>{profile.CreateDate}</p>
            </div>

        </div>
    )
}