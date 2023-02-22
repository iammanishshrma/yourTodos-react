import { configureStore } from "@reduxjs/toolkit";

import todoSlice from "./slices/todoSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer: {
        todoList: todoSlice,
        userData: userSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
