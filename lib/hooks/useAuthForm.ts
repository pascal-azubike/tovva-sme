import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validateFormData, clearFormData, generateCSRFToken } from "@/lib/utils";
import { z } from "zod";

// Configuration interface
interface AuthFormConfig {
  schema: z.ZodSchema;                        // Zod schema for validation
  defaultValues: Record<string, unknown>;     // Initial form values
  onSubmit: (data: Record<string, unknown>) => Promise<void>; // Custom submit handler
  passwordFields?: string[];                  // Which fields should have password visibility toggle
  showPasswordToggle?: boolean;               // Whether to show password toggle functionality
  enableSecurity?: boolean;                   // Whether to enable security features
}

export function useAuthForm(config: AuthFormConfig) {
  const [passwordVisibility, setPasswordVisibility] = useState<Record<string, boolean>>({});
  const [csrfToken, setCsrfToken] = useState<string>('');
  const formRef = useRef<HTMLFormElement>(null);
  const tokenGeneratedRef = useRef<boolean>(false);

  const form = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(config.schema as any),
    defaultValues: config.defaultValues,
  });

  // Initialize password visibility for all password fields
  const initializePasswordVisibility = useCallback(() => {
    const initial: Record<string, boolean> = {};
    config.passwordFields?.forEach((field: string) => {
      initial[field] = false;
    });
    setPasswordVisibility(initial);
  }, [config.passwordFields]);

  // Toggle password visibility for a specific field
  const togglePasswordVisibility = (fieldName: string) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  // Secure form submission with input validation and sanitization
  const handleSubmit = async (data: Record<string, unknown>) => {
    try {
      let secureData = data;
      
      // Apply security measures if enabled
      if (config.enableSecurity !== false) {
        // Validate and sanitize input data
        secureData = validateFormData(data);
        
        // Add CSRF token to request
        if (csrfToken) {
          secureData._csrf = csrfToken;
        }
      }
      
      // Call the custom submit handler
      await config.onSubmit(secureData);
      
      // Clear sensitive form data after successful submission
      if (config.enableSecurity !== false) {
        clearFormData(formRef.current);
      }
      
    } catch (error) {
      console.error("Form submission failed:", error);
      throw error; // Re-throw so component can handle it
    }
  };

  // Initialize security features
  useEffect(() => {
    if (config.showPasswordToggle && config.passwordFields) {
      initializePasswordVisibility();
    }
    
    // Generate CSRF token if security is enabled and token hasn't been generated yet
    if (config.enableSecurity !== false && !tokenGeneratedRef.current) {
      setCsrfToken(generateCSRFToken());
      tokenGeneratedRef.current = true;
    }
  }, [config.showPasswordToggle, config.passwordFields, config.enableSecurity, initializePasswordVisibility]);

  return {
    form,
    passwordVisibility,
    togglePasswordVisibility,
    handleSubmit,
    isSubmitting: form.formState.isSubmitting,
    // Helper function to check if a field is a password field
    isPasswordField: (fieldName: string) => config.passwordFields?.includes(fieldName) || false,
    // Security-related returns
    csrfToken,
    formRef,
    // Helper to clear form data manually
    clearForm: () => clearFormData(formRef.current),
  };
} 