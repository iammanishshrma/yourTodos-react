import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import TodoList from "../../components/todo/TodoList";
import { getTodo, clearTodo } from "../../shared/store/slices/todoSlice";
import "./HomePage.css";

const HomePage = () => {
    const todoList = useSelector((state) => state.todoList.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodo());

        return () => {
            dispatch(clearTodo());
        };
    }, [dispatch]);

    console.log(todoList);

    if (!todoList) {
        return (
            <h1
                style={{
                    textAlign: "center",
                    marginTop: "40px",
                    fontSize: "20px",
                }}
            >
                Please login and add todos
            </h1>
        );
    }
    return (
        <section className="home-page">
            <h1 className="home-page__heading">Todo</h1>
            <TodoList todoList={todoList} />
        </section>
    );
};

export default HomePage;
