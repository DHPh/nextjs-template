"use client";

import React, { forwardRef, SelectHTMLAttributes } from "react";
import FormError from "./FormError";

interface FormSelectOption {
    value: string;
    label: string;
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: FormSelectOption[];
    errors?: string[];
    containerClassName?: string;
    labelClassName?: string;
    selectClassName?: string;
    errorClassName?: string;
    placeholder?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
    (
        {
            label,
            name,
            options,
            errors,
            containerClassName = "mb-4",
            labelClassName = "block text-sm font-medium text-gray-700 mb-1",
            selectClassName = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500",
            errorClassName,
            placeholder,
            id,
            ...props
        },
        ref,
    ) => {
        const selectId = id || name;
        const hasError = errors && errors.length > 0;

        return (
            <div className={containerClassName}>
                {label && (
                    <label htmlFor={selectId} className={labelClassName}>
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    id={selectId}
                    name={name}
                    className={`${selectClassName} ${hasError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    aria-invalid={hasError ? "true" : "false"}
                    aria-describedby={hasError && selectId ? `${selectId}-error` : undefined}
                    {...props}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <FormError errors={errors} fieldName={name} className={errorClassName} />
            </div>
        );
    },
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
