import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { apiInstance } from "../../utils/api";

const initialState = {
    todos: null,
};

export const getTodo = createAsyncThunk("/getTodo", (thunkAPI) => {
    return apiInstance
        .get("/todos")
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return thunkAPI.rejectWithValue("Error");
        });
});

export const deleteTodo = createAsyncThunk(
    "/deleteTodo",
    async (id, { dispatch }) => {
        await apiInstance
            .delete(`/todos/${id}`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log("Error");
            });
        return dispatch(getTodo());
    }
);
export const updateComplete = createAsyncThunk(
    "/updateComplete",
    async ({ id, payload }, { dispatch }) => {
        await apiInstance
            .patch(`/todos/update-complete/${id}`, payload)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log("Error");
            });
    }
);

export const updateTodo = createAsyncThunk(
    "/deleteTodo",
    async ({ id, payload }, { dispatch }) => {
        await apiInstance
            .patch(`/todos/${id}`, payload)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log("Error");
            });
        return dispatch(getTodo());
    }
);
const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        clearTodo: (state, action) => {
            state.todos = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getTodo.pending, (state, action) => {});
        builder.addCase(getTodo.fulfilled, (state, action) => {
            state.todos = action.payload.todos;
        });
        builder.addCase(getTodo.rejected, (state, action) => {});
    },
});

export default todoSlice.reducer;
export const { clearTodo } = todoSlice.actions;
