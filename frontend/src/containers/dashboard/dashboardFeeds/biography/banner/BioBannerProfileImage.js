import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import { useSelector } from 'react-redux';
import { selectCurrentProfileImage } from '../../../../../redux/slices/photoAlbumsSlice';
import { CameraButton } from './CameraButton';
import { onError } from '../../../../../lib/errorLib';

export const BioBannerProfileImage = (props) => {
    const { toggleView } = props;
    const profileImageKey = useSelector(selectCurrentProfileImage);
    const [profileImageUrl, setProfileImageUrl] = useState(null);

    useEffect(() => {
        async function loadProfileImage() {
            try {
                const url = await Storage.vault.get(profileImageKey);
                setProfileImageUrl(url);
            } catch (e) {
                onError(e);
            }
        }

        if (profileImageKey) {
            loadProfileImage();
        }
    }, [profileImageKey]);

    return (
        <div className="bio-feed-profile-img-container">
            {profileImageUrl && (
                <img src={profileImageUrl} alt="Profile" className="profile-image" />
            )}
            <div className="profile-img-upload-overlay">
                <CameraButton toggleView={toggleView} />
            </div>
        </div>
    );

};

