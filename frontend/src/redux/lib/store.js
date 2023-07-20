import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import photoAlbumsReducer from '../slices/photoAlbumsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    photoAlbums: photoAlbumsReducer
  },
})