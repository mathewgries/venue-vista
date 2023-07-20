import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { selectUser } from '../../../../../redux/slices/userSlice'
import { BioBanner } from '../banner/BioBanner'
import { ProfileRating } from './ProfileRating'
import { BioEditButton } from './BioEditButton';
import { ProfileBiography } from './ProfileBiography';
import { Location } from './Location';
import { Birthdate } from './Birthdate';
import { ContactInfo } from './ContactInfo';
import { SiteLinks } from './SiteLinks';
import { ProfileList } from './ProfileList';
import { EditBioFeedForm } from '../editBio/EditBioFeedForm'
import { ImageUploader } from '../ImageUploader'
import './bioFeed.css'

export default function BioFeed() {
    const profile = useSelector(selectUser)
    const [isProfileImageUpload, setIsProfileImageUpload] = useState(false)
    const [isBannerImageUpload, setIsBannerImageUpload] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isBioPopup, setIsBioPopup] = useState(false);
    const isCurrentUserProfile = true;

    const toggleProfileImageUpload = () => {
        setIsProfileImageUpload(!isProfileImageUpload)
    }

    const toggleBannerImageUpload = () => {
        setIsBannerImageUpload(!isBannerImageUpload)
    }

    const toggleBioPopup = () => {
        setIsBioPopup(!isBioPopup)
    };

    const toggleEdit = () => {
        setIsEditOpen(!isEditOpen)
    }

    if (isBioPopup) {
        return (
            <div className='bio-feed-container'>
                <div className="bio-feed-full-bio">
                    <div className="close-button">
                        <button onClick={toggleBioPopup}>
                            X
                        </button>
                    </div>
                    <p className='full-bio-text'>
                        {profile.biography}
                    </p>
                </div>
            </div>
        )
    }

    if (isProfileImageUpload || isBannerImageUpload) {
        return (
            <div className='bio-feed-container'>
                <ImageUploader
                    toggleView={isProfileImageUpload
                        ? toggleProfileImageUpload
                        : toggleBannerImageUpload
                    }
                    photoAlbumName={isProfileImageUpload
                        ? "Profile Photos"
                        : "Banner Photos"
                    }
                />
            </div>
        )
    }

    if (isEditOpen) {
        return (
            <div className='bio-feed-container'>
                <EditBioFeedForm profile={profile} toggleEdit={toggleEdit} />
            </div>
        )
    }

    return (
        <div className='bio-feed-container'>
            <BioBanner
                profile={profile}
                toggleProfileImageUpload={toggleProfileImageUpload}
                toggleBannerImageUpload={toggleBannerImageUpload}
            />
            {isCurrentUserProfile && <BioEditButton toggleEdit={toggleEdit} />}
            <ProfileRating />
            <ProfileBiography biography={profile.biography} toggleBioPopup={toggleBioPopup} />
            <Location address={profile.address} />
            <Birthdate birthdate={profile.birthdate} />
            <ContactInfo contactInfo={profile.contactInfo} />
            <SiteLinks siteLinks={profile.siteLinks} />
            <ProfileList profiles={profile.profiles} />
            <div className='bio-feed-member-since bio-feed-details-item'>
                <h6>Member Since:</h6>
                <p>{profile.createDate}</p>
            </div>
        </div>
    )
}