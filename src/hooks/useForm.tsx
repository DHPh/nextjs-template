"use client";

import { useRef, useState, useCallback, FormEvent } from "react";
import { z } from "zod";
import { createFormValidator, ValidationResult } from "@/utils/form-validation";

/**
 * Props for the useFormUncontrolled hook
 */
type UseFormUncontrolledProps<T extends z.ZodType> = {
    schema: T;
    defaultValues?: Partial<z.infer<T>>;
    onSubmit?: (values: z.infer<T>) => void | Promise<void>;
};

/**
 * Hook for handling form state and validation with Zod using uncontrolled inputs
 * Uses refs instead of state to avoid unnecessary re-renders
 */
export function useFormUncontrolled<T extends z.ZodType>({
    schema,
    defaultValues = {},
    onSubmit,
}: UseFormUncontrolledProps<T>) {
    type FormValues = z.infer<T>;

    // Create validator from schema
    const validator = createFormValidator(schema);

    // Use refs instead of state for values to prevent re-renders
    const formValues = useRef<Partial<FormValues>>(defaultValues);

    // We still need some state for UI feedback
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    /**
     * Get current form values from the refs
     */
    const getFormValues = useCallback((): Partial<FormValues> => {
        return formValues.current;
    }, []);

    /**
     * Update a form value in the ref (doesn't cause re-render)
     */
    const setValue = useCallback(
        (field: keyof FormValues, value: any) => {
            formValues.current = { ...formValues.current, [field]: value };

            // Clear errors for this field if they exist
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
     * Reset form to default values
     */
    const resetForm = useCallback(() => {
        formValues.current = defaultValues;
        setErrors({});
        setIsSubmitting(false);
    }, [defaultValues]);

    /**
     * Validate entire form without submitting
     */
    const validateForm = useCallback((): ValidationResult<FormValues> => {
        const result = validator.validate(formValues.current);
        if (!result.success) {
            setErrors(result.errors || {});
        } else {
            setErrors({});
        }
        return result;
    }, [validator]);

    /**
     * Handle form submission
     */
    const handleSubmit = useCallback(
        async (e?: FormEvent) => {
            if (e) {
                e.preventDefault();
            }

            setIsSubmitting(true);

            // Validate all fields
            const result = validator.validate(formValues.current);

            if (!result.success) {
                setErrors(result.errors || {});
                setIsSubmitting(false);
                return false;
            }

            // Clear errors on successful validation
            setErrors({});

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
        [validator, onSubmit],
    );

    return {
        getValues: getFormValues,
        setValue,
        errors,
        isSubmitting,
        handleSubmit,
        resetForm,
        validateForm,
        register: (field: keyof FormValues) => {
            // Return proper props for uncontrolled inputs
            return {
                name: field,
                defaultValue: defaultValues[field],
                onChange: (
                    e: React.ChangeEvent<
                        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
                    >,
                ) => setValue(field, e.target.value),
                "aria-invalid": errors[field as string] ? "true" : "false",
                ref: (node: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null) => {
                    if (node) {
                        // Manually update the ref value when the node changes
                        const updateRef = () => {
                            setValue(field, node.value);
                        };

                        // Add event listeners to capture value changes
                        // We're using change event to capture when the value actually changes
                        node.addEventListener("change", updateRef);

                        // Cleanup on unmount
                        return () => {
                            node.removeEventListener("change", updateRef);
                        };
                    }
                },
            };
        },
        // For checkbox and radio inputs
        registerChecked: (field: keyof FormValues) => {
            return {
                name: field,
                defaultChecked: Boolean(defaultValues[field]),
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    setValue(field, e.target.checked),
                "aria-invalid": errors[field as string] ? "true" : "false",
                ref: (node: HTMLInputElement | null) => {
                    if (node) {
                        // For checkboxes/radios we track the checked property
                        const updateRef = () => {
                            setValue(field, node.checked);
                        };

                        node.addEventListener("change", updateRef);

                        return () => {
                            node.removeEventListener("change", updateRef);
                        };
                    }
                },
            };
        },
    };
}

export default useFormUncontrolled;
