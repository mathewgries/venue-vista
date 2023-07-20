import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { amplify_client } from '../../api/amplify_client'
import { fetchUser } from './userSlice';

export const createPhotoAlbum = createAsyncThunk(
    "photoAlbums/createPhotoAlbum",
    async (data) => {
        await amplify_client.post({
            api: "venue-vista",
            endpoint: `/photoAlbums`,
            data
        })
        return data
});

export const updatePhotoAlbum = createAsyncThunk(
    "photoAlbums/updatePhotoAlbum",
    async (data) => {
        await amplify_client.put({
            api: "venue-vista",
            endpoint: `/photoAlbums/${data.entityId}`,
            data
        })
        return data
    }
);

const initialState = {
    currentProfileImage: null,
    currentBannerImage: null,
    photoAlbums: [],
    status: "idle",
    error: null,
}

export const photoAlbumsSlice = createSlice({
    name: 'photoAlbums',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = "success";
                const albums = action.payload.filter((item) => item.entityType === 'PHOTO_ALBUM')
                const profilePhotos = albums.find((x) => x.photoAlbumName === "Profile Photos").imageKeys
                if (profilePhotos.length > 0) {
                    state.currentProfileImage = Math.max(...profilePhotos)
                }
                const bannerPhotos = albums.find((x) => x.photoAlbumName === "Banner Photos").imageKeys
                if (bannerPhotos.length > 0) {
                    state.currentBannerImage = Math.max(...bannerPhotos)
                }
                state.photoAlbums = albums;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
        builder
            .addCase(createPhotoAlbum.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(createPhotoAlbum.fulfilled, (state, action) => {
                state.status = "success";
                state.photoAlbums = action.payload;
            })
            .addCase(createPhotoAlbum.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
        builder
            .addCase(updatePhotoAlbum.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(updatePhotoAlbum.fulfilled, (state, action) => {
                state.status = "success";
                const { photoAlbumName, imageKeys, entityId } = action.payload
                const updatedAlbums = state.photoAlbums.map((album) =>
                    album.entityId === entityId ? action.payload : album
                );
                if (photoAlbumName === 'Profile Photos') {
                    state.currentProfileImage = imageKeys[0]
                } else if (photoAlbumName === 'Banner Photos') {
                    state.currentBannerImage = imageKeys[0]
                }
                state.photoAlbums = updatedAlbums;
            })
            .addCase(updatePhotoAlbum.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
})

// Action creators are generated for each case reducer function
export default photoAlbumsSlice.reducer

export const selectAllPhotoAlbums = (state) => state.photoAlbums.photoAlbums;
export const selectCurrentProfileImage = (state) => state.photoAlbums.currentProfileImage;
export const selectCurrentBannerImage = (state) => state.photoAlbums.currentBannerImage;
