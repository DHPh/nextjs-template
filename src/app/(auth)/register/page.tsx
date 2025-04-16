"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormUncontrolled } from "@/hooks/useFormUncontrolled";
import { registrationSchema, type RegistrationFormValues } from "@/utils/form-schemas";
import FormInput from "@/components/global/FormInput";
import FormError from "@/components/global/FormError";
import { useAuthStore } from "@/stores/useAuthStore";

export default function RegisterPage() {
    const router = useRouter();
    const { login } = useAuthStore();

    const { errors, handleSubmit, isSubmitting, register, registerChecked } = useFormUncontrolled({
        schema: registrationSchema,
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreeToTerms: false,
        },
        onSubmit: async (values: RegistrationFormValues) => {
            try {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1000));

                console.log("Registration successful:", values);

                // Auto-login after registration
                login({ name: values.name, email: values.email });

                router.push("/");
            } catch (error) {
                console.error("Registration error:", error);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create a new account
                    </h1>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <Link
                            href="/login"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            sign in to your existing account
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        {/* Sử dụng các thuộc tính register một cách an toàn */}
                        <FormInput
                            label="Full Name"
                            id="name"
                            autoComplete="name"
                            required
                            {...register("name")}
                        />

                        <FormInput
                            label="Email Address"
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            {...register("email")}
                        />

                        <FormInput
                            label="Password"
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            {...register("password")}
                        />

                        <FormInput
                            label="Confirm Password"
                            id="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            {...register("confirmPassword")}
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            id="agree-terms"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            {...registerChecked("agreeToTerms")}
                        />
                        <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
                            I agree to the{" "}
                            <a href="#" className="text-blue-600 hover:text-blue-500">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-blue-600 hover:text-blue-500">
                                Privacy Policy
                            </a>
                        </label>
                    </div>
                    {errors.agreeToTerms && <FormError errors={errors.agreeToTerms} />}

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Creating account..." : "Create account"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
