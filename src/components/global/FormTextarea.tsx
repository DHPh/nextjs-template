"use client";

import React, { forwardRef, TextareaHTMLAttributes } from "react";
import FormError from "./FormError";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    errors?: string[];
    containerClassName?: string;
    labelClassName?: string;
    textareaClassName?: string;
    errorClassName?: string;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
    (
        {
            label,
            name,
            errors,
            containerClassName = "mb-4",
            labelClassName = "block text-sm font-medium text-gray-700 mb-1",
            textareaClassName = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500",
            errorClassName,
            id,
            ...props
        },
        ref,
    ) => {
        const textareaId = id || name;
        const hasError = errors && errors.length > 0;

        return (
            <div className={containerClassName}>
                {label && (
                    <label htmlFor={textareaId} className={labelClassName}>
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={textareaId}
                    name={name}
                    className={`${textareaClassName} ${hasError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                    aria-invalid={hasError ? "true" : "false"}
                    aria-describedby={hasError && textareaId ? `${textareaId}-error` : undefined}
                    {...props}
                />
                <FormError errors={errors} fieldName={name} className={errorClassName} />
            </div>
        );
    },
);

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
