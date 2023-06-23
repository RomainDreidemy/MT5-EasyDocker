import React from "react";

interface InputProps {
    type: string,
    placeholder?: string,
    name?: string,
    value?: string,
    className?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input = ({ type, placeholder, name, value, className, onChange, onKeyDown }: InputProps) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            className={`input input-bordered w-full max-w-xs mt-1 ${className}`}
        />
    )
}

export default Input