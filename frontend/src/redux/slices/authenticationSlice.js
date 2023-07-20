import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    authentication: null,
    status: "idle",
    error: null,
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(createUser.pending, (state, action) => {
                state.status = "pending";
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = "success";
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
})

// Action creators are generated for each case reducer function
export default authenticationSlice.reducer