import React, { forwardRef } from "react";

import "./Input.css";

const Input = forwardRef((props, ref) => {
    return (
        <div className="form-control">
            <label htmlFor={props.id}>{props.title}</label>
            <input
                ref={ref}
                type={props.type}
                id={props.id}
                {...props.register(props.inputName)}
            />
            {props.isError && (
                <span className="error">{props.errorMessage}</span>
            )}
        </div>
    );
});

export default Input;
