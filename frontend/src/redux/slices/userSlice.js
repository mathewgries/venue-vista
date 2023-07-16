import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { amplify_client } from '../../api/amplify_client'

export const fetchUser = createAsyncThunk(
    "users/fetchUser",
    async () => { return await amplify_client.get({ api: "venue-vista", endpoint: "/users/" }); }
);

export const updateUser = createAsyncThunk(
    "users/updateUser",
    async (data) => {
        await amplify_client.put({
            api: "venue-vista",
            endpoint: `/users/${data.EntityId}`,
            data
        })
        return data
    }
);

const initialState = {
    user: null,
    status: "idle",
    error: null,
}

export const userlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
        builder
            .addCase(updateUser.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.status = "success";
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
})

// Action creators are generated for each case reducer function
export default userlice.reducer

export const selectUser = (state) => state.user.user;