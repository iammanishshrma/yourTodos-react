import React, { useState } from "react";
import { createPortal } from "react-dom";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
    deleteTodo,
    updateComplete,
} from "../../shared/store/slices/todoSlice";
import ConfirmModal from "../ConfrmModal/ConfirmModal";

const TodoListItem = (props) => {
    const dispatch = useDispatch();
    const [isChecked, setIsChecked] = useState(props.itemData.completed);
    const { itemData } = props;
    const [isShowModal, setIsShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const deleteHandler = (id) => {
        const ele = document.getElementsByTagName("body")[0];
        ele.style.overflow = "hidden";
        setItemToDelete(id);
        setIsShowModal(true);
        // dispatch(deleteTodo(id));
    };
    const checkChangeHandler = (id) => {
        setIsChecked((prev) => !prev);
        dispatch(updateComplete({ id, payload: { completed: !isChecked } }));
    };
    const confirmHandler = () => {
        dispatch(deleteTodo(itemToDelete));
        setIsShowModal(false);
    };
    const cancelHandler = () => {
        setIsShowModal(false);
        const ele = document.getElementsByTagName("body")[0];
        ele.style.overflow = "auto";
    };

    return (
        <>
            <li
                className={`home-page__todo-list-item ${
                    isChecked && "completed"
                }`}
            >
                {isChecked && <span className="complete-tag">Completed</span>}
                <div className="home-page__header-wrapper">
                    <div className="home-page__check-wrap">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => checkChangeHandler(itemData._id)}
                        />
                    </div>
                    <h3 className="home-page__list-heading">
                        {itemData.title}
                    </h3>
                </div>
                {itemData.description && (
                    <p className="home-page__list-description">
                        {itemData.description}
                    </p>
                )}
                <div className="home-page__cta-btns">
                    <Link
                        className="btn"
                        to={isChecked ? "/" : `/edit-todo/${itemData._id}`}
                    >
                        Edit
                    </Link>
                    <button
                        className="btn danger"
                        onClick={() => deleteHandler(itemData._id)}
                    >
                        delete
                    </button>
                </div>
            </li>
            {isShowModal &&
                createPortal(
                    <ConfirmModal
                        onConfirm={confirmHandler}
                        onCancel={cancelHandler}
                    />,
                    document.getElementById("modal-hook")
                )}
        </>
    );
};

export default TodoListItem;
