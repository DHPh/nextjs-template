"use client";

import React from "react";

interface FormErrorProps {
    errors?: string[];
    fieldName?: string;
    className?: string;
}

/**
 * Component to display form validation errors
 */
export default function FormError({
    errors,
    fieldName,
    className = "text-red-500 text-sm mt-1",
}: FormErrorProps) {
    if (!errors || errors.length === 0) return null;

    return (
        <div className={className} role="alert" aria-live="polite">
            {errors.map((error, index) => (
                <p
                    key={`${fieldName}-error-${index}`}
                    id={fieldName ? `${fieldName}-error` : undefined}
                >
                    {error}
                </p>
            ))}
        </div>
    );
}
