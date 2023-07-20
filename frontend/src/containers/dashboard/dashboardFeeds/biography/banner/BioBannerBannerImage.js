import React, { useState, useEffect } from 'react';
import { Storage } from 'aws-amplify';
import { useSelector } from 'react-redux';
import { selectCurrentBannerImage } from '../../../../../redux/slices/photoAlbumsSlice';
import { CameraButton } from './CameraButton';
import { onError } from '../../../../../lib/errorLib';

export const BioBannerBannerImage = (props) => {
    const { toggleView } = props;
    const bannerImageKey = useSelector(selectCurrentBannerImage);
    const [bannerImageUrl, setBannerImageUrl] = useState(null);

    useEffect(() => {
        async function loadBannerImage() {
            try {
                const url = await Storage.vault.get(bannerImageKey);
                setBannerImageUrl(url);
            } catch (e) {
                onError(e);
            }
        }

        if (bannerImageKey) {
            loadBannerImage();
        }
    }, [bannerImageKey]);

    return (
        <div className="bio-feed-banner-img-container">
                {bannerImageUrl && (
                    <img src={bannerImageUrl} alt="Banner" className="banner-image" />
                )}
                <div className="banner-img-upload-overlay">
                    <CameraButton toggleView={toggleView}/>
                </div>
            </div>
    );

    // return (
    //     <div className="bio-feed-banner-img-container">
    //         {bannerImageUrl ? (
    //             <img src={bannerImageUrl} alt="Banner" />
    //         ) : (
    //             <div className="banner-img-upload-overlay">
    //                 <CameraButton toggleView={toggleView}/>
    //             </div>
    //         )}
    //     </div>
    // );

    
};
