import React, { useState, useEffect } from "react";
import { formatNewAlbum, formatUpdatedAlbum } from "../../helpers";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPhotoAlbums, updatePhotoAlbum } from "../../../../redux/slices/photoAlbumsSlice";
import { s3Upload } from '../../../../lib/awsLib';
import { onError } from '../../../../lib/errorLib';

export const ImageUploader = (props) => {
    const { photoAlbumName, toggleView } = props;
    const dispatch = useDispatch();
    const status = useSelector(state => state.photoAlbums.status)
    const [isLoading, setIsLoading] = useState(false)
    const photoAlbums = useSelector(selectAllPhotoAlbums);
    const [photoAlbum, setPhotoAlbum] = useState(
        photoAlbumName
            ? photoAlbums.find(album => album.photoAlbumName === photoAlbumName)
            : photoAlbums.find(album => album.photoAlbumName === "Default")
    );
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if(status === 'pending'){
            setIsLoading(true)
        }else{
            setIsLoading(false)
        }
    }, [status])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const handleAddPhoto = async (e) => {
        e.preventDefault()
        try {
            if (selectedImage) {
                const newImageKey = await s3Upload(selectedImage);
                console.log("Image uploaded successfully:", newImageKey);
                const updatedAlbum = formatUpdatedAlbum(photoAlbum, newImageKey)
                await dispatch(updatePhotoAlbum(updatedAlbum)).unwrap()
            } else {
                console.log("No file selected.");
            }
        } catch (e) {
            onError(e);
        }
    };

    if(isLoading){
        return <div>...Loading</div>
    }

    return (
        <div>
            <div>
                <input type="file" text="Choose Image" onChange={handleFileChange} />
            </div>
            <div>
                <button onClick={handleAddPhoto}>Add Photo</button>
                <button onClick={toggleView}>Back</button>
            </div>
        </div>
    );
};
