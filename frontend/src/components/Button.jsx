import React from 'react';

const Button = ({ children, className, ...rest }) => {
    return (
        <button className={`w-24 bg-maincolor text-white font-bold py-2 px-4 rounded ${className}`} {...rest}>
            {children}
        </button>
    );
};

export default Button;
