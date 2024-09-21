import React from "react";
 
const Form = ({ children }) => {
    return (
        <div className="form-container">
            {children}
        </div>
    );
};

export default Form;