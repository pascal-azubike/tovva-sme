import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Frontend Security Utilities

/**
 * Sanitizes user input to prevent XSS attacks
 * @param input - The user input to sanitize
 * @returns Sanitized input string
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''); // Remove script tags
}

/**
 * Checks if input contains suspicious content patterns
 * @param input - The input to check
 * @returns True if suspicious content is detected
 */
export function containsSuspiciousContent(input: string): boolean {
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
    /vbscript:/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /<link/i,
    /<meta/i
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(input));
}

/**
 * Validates and sanitizes form data
 * @param data - The form data to validate
 * @returns Sanitized and validated data
 */
export function validateFormData(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Don't sanitize passwords or sensitive fields
      if (key.toLowerCase().includes('password') || key.toLowerCase().includes('token')) {
        sanitized[key] = value;
      } else {
        sanitized[key] = sanitizeInput(value);
        
        // Check for suspicious content
        if (containsSuspiciousContent(value)) {
          throw new Error(`Invalid content detected in ${key}`);
        }
      }
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
}

/**
 * Generates a simple CSRF token (for demo purposes)
 * In production, this should come from the backend
 */
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Clears sensitive form data from state
 * @param formRef - Reference to the form element
 */
export function clearFormData(formRef?: HTMLFormElement | null): void {
  if (formRef) {
    formRef.reset();
  }
  
  // Clear any password fields that might be in state
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  passwordInputs.forEach(input => {
    (input as HTMLInputElement).value = '';
  });
}

/**
 * Checks if the current environment is production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

/**
 * Forces HTTPS in production
 */
export function enforceHTTPS(): void {
  if (isProduction() && typeof window !== 'undefined') {
    if (window.location.protocol === 'http:') {
      window.location.href = window.location.href.replace('http:', 'https:');
    }
  }
}
