import { z } from "zod";

/**
 * Creates a type-safe form validator using Zod schemas
 * @param schema The Zod schema to validate with
 * @returns An object with methods to validate form data
 */
export function createFormValidator<T extends z.ZodType>(schema: T) {
  return {
    /**
     * Validates form data against the schema
     * @param data The data to validate
     * @returns An object with validation result information
     */
    validate: (data: unknown) => {
      const result = schema.safeParse(data);
      
      if (result.success) {
        return {
          success: true as const,
          data: result.data,
          errors: null,
        };
      }
      
      // Format errors into a more user-friendly structure
      const formattedErrors = result.error.errors.reduce(
        (acc, err) => {
          const path = err.path.join(".");
          if (!acc[path]) {
            acc[path] = [];
          }
          acc[path].push(err.message);
          return acc;
        },
        {} as Record<string, string[]>
      );
      
      return {
        success: false as const,
        data: null,
        errors: formattedErrors,
      };
    },
    
    /**
     * Gets the TypeScript type of the schema output
     */
    schema,
  };
}

// Common validation patterns
export const validations = {
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
  url: z.string().url("Please enter a valid URL"),
  required: (fieldName: string) => z.string().min(1, `${fieldName} is required`),
};

/**
 * Hook-compatible validation type
 */
export type ValidationResult<T> = 
  | { success: true; data: T; errors: null }
  | { success: false; data: null; errors: Record<string, string[]> };