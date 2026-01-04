"use client";

import { useState, useCallback } from "react";
import { z } from "zod";
import { createFormValidator, ValidationResult } from "@/utils/form-validation";

/**
 * Props for the useForm hook
 */
type UseFormProps<T extends z.ZodType> = {
    schema: T;
    initialValues?: Partial<z.infer<T>>;
    onSubmit?: (values: z.infer<T>) => void | Promise<void>;
};

/**
 * Hook for handling form state and validation with Zod
 */
export function useForm<T extends z.ZodType>({
    schema,
    initialValues = {},
    onSubmit,
}: UseFormProps<T>) {
    type FormValues = z.infer<T>;

    // Create validator from schema
    const validator = createFormValidator(schema);

    // State
    const [values, setValues] = useState<Partial<FormValues>>(initialValues);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Handle change for any form field
     */
    const handleChange = useCallback(
        (field: keyof FormValues, value: any) => {
            setValues((prev) => ({ ...prev, [field]: value }));

            // Clear errors on change
            if (errors[field as string]) {
                setErrors((prev) => {
                    const newErrors = { ...prev };
                    delete newErrors[field as string];
                    return newErrors;
                });
            }
        },
        [errors],
    );

    /**
     * Mark field as touched on blur
     */
    const handleBlur = useCallback(
        (field: keyof FormValues) => {
            setTouched((prev) => ({ ...prev, [field]: true }));

            // Validate individual field on blur
            const result = validator.validate({ ...values });
            if (!result.success && result.errors && result.errors[field as string]) {
                setErrors((prev) => ({ ...prev, [field]: result.errors?.[field as string] || [] }));
            }
        },
        [values, validator],
    );

    /**
     * Reset form to initial values
     */
    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues]);

    /**
     * Handle form submission
     */
    const handleSubmit = useCallback(
        async (e?: React.FormEvent) => {
            if (e) {
                e.preventDefault();
            }

            setIsSubmitting(true);

            // Validate all fields
            const result = validator.validate(values);

            if (!result.success) {
                setErrors(result.errors || {});
                setIsSubmitting(false);

                // Mark all fields with errors as touched
                const newTouched = { ...touched };
                Object.keys(result.errors || {}).forEach((key) => {
                    newTouched[key] = true;
                });
                setTouched(newTouched);

                return false;
            }

            try {
                // Call onSubmit handler if provided
                if (onSubmit) {
                    await onSubmit(result.data);
                }
                return true;
            } catch (error) {
                console.error("Form submission error:", error);
                return false;
            } finally {
                setIsSubmitting(false);
            }
        },
        [values, validator, onSubmit, touched],
    );

    /**
     * Validate the entire form without submitting
     */
    const validateForm = useCallback((): ValidationResult<FormValues> => {
        const result = validator.validate(values);
        if (!result.success) {
            setErrors(result.errors || {});
        }
        return result;
    }, [values, validator]);

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        validateForm,
        register: (field: keyof FormValues) => ({
            name: field,
            value: values[field],
            onChange: (
                e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
            ) => handleChange(field, e.target.value),
            onBlur: () => handleBlur(field),
            "aria-invalid": touched[field as string] && errors[field as string] ? "true" : "false",
        }),
    };
}

export default useForm;
