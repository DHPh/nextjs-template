"use client";

import React, { forwardRef, InputHTMLAttributes } from "react";
import FormError from "./FormError";

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "aria-invalid"> {
    label?: string;
    errors?: string[];
    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    errorClassName?: string;
    "aria-invalid"?: boolean | "true" | "false" | "grammar" | "spelling";
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    (
        {
            label,
            name,
            errors,
            containerClassName = "mb-4",
            labelClassName = "block text-sm font-medium text-gray-700 mb-1",
            inputClassName = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500",
            errorClassName,
            id,
            ...props
        },
        ref,
    ) => {
        const inputId = id || name;
        const hasError = errors && errors.length > 0;

        return (
            <div className={containerClassName}>
                {label && (
                    <label htmlFor={inputId} className={labelClassName}>
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    name={name}
                    className={`${inputClassName} ${hasError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    aria-invalid={hasError ? true : false}
                    aria-describedby={hasError && inputId ? `${inputId}-error` : undefined}
                    {...props}
                />
                <FormError errors={errors} fieldName={name} className={errorClassName} />
            </div>
        );
    },
);

FormInput.displayName = "FormInput";

export default FormInput;
