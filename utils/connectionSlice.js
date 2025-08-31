import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({

    name: 'connections',
    initialState: null,
    reducers: {

        addConnections: (state, action) => action.payload,
        // eslint-disable-next-line no-unused-vars
        removeConnections: (state, action) => null
    }
})
export const { addConnections, removeConnections } = connectionSlice.actions
export default connectionSlice.reducer;
