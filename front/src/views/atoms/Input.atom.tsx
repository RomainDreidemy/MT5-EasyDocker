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
            className={`border rounded-lg px-3 py-2 mt-1 text-sm w-full focus:outline-none focus:border-gray-400 ${className}`}
        />
    )
}

export default Input