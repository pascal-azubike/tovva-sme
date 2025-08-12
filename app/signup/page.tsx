"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import AuthContainer from "@/components/ui/auth-container";
import AuthHeader from "@/components/ui/auth-header";
import AuthActions from "@/components/ui/auth-actions";
import { BackgroundElements } from "@/components/ui/background-elements";
import { Eye, EyeOff } from "lucide-react";

import { PageTransition } from "@/components/ui/page-transition";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/lib/schemas";
import { useAuthForm } from "@/lib/hooks/useAuthForm";

export default function SignupPage() {
  const router = useRouter();
  
  const signupConfig = useMemo(() => ({
    schema: signupSchema,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (data: Record<string, unknown>) => {
      // Simulate signup process
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect to email verification page
      const email = data.email as string;
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    },
    passwordFields: ['password', 'confirmPassword'],
    showPasswordToggle: true,
    enableSecurity: true,
  }), [router]);

  const { 
    form, 
    passwordVisibility, 
    togglePasswordVisibility, 
    handleSubmit, 
    isSubmitting,
    csrfToken,
    formRef 
  } = useAuthForm(signupConfig);

  return (
    <PageTransition>
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Left Section - Welcome (Fixed) with Figma Styling */}
      <div className="hidden lg:block lg:fixed lg:left-0 lg:top-0 lg:w-1/2 lg:h-full z-10 pointer-events-none bg-primary">
        {/* Background blur like login - hide top blob on left */}
        <BackgroundElements hideTop />
        {/* Welcome Text - responsive, no clipping */}
        <div className="absolute inset-x-6 sm:inset-x-10 lg:inset-x-20 bottom-16 sm:bottom-24 lg:bottom-40 flex flex-col gap-2">
          <span
            className="text-4xl sm:text-5xl font-light italic font-['Poppins'] leading-tight text-left block text-transparent bg-clip-text"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,1) 65%, rgba(255,255,255,0.25) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Welcome to Trovva.
          </span>
          <span
            className="text-lg sm:text-xl lg:text-2xl font-light italic font-['Poppins'] leading-snug text-left block text-transparent bg-clip-text"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.9) 40%, rgba(255,255,255,0) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Start Your Entrepreneurial Journey Today.
          </span>
        </div>
      </div>

      {/* Right Section - Form (Scrollable) with responsive background */}
      <div className="w-full lg:w-1/2 lg:ml-auto relative z-20 bg-primary lg:bg-accent">
        {/* Show same blur on mobile when left is hidden */}
        <div className="absolute inset-0 lg:hidden pointer-events-none">
          <BackgroundElements />
        </div>
        <div className="w-full h-full flex items-center justify-center px-4 py-8 overflow-y-auto">
          <AuthContainer>
            <AuthHeader title="Create your account" />
            <SignupForm
              form={form}
              onSubmit={handleSubmit}
              passwordVisibility={passwordVisibility}
              onTogglePassword={togglePasswordVisibility}
              isSubmitting={isSubmitting}
              csrfToken={csrfToken}
              formRef={formRef}
            />
          </AuthContainer>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}

// Form fields component
interface FormFieldsProps {
  form: ReturnType<typeof useAuthForm>['form'];
  passwordVisibility: Record<string, boolean>;
  onTogglePassword: (fieldName: string) => void;
}

const FormFields = ({
  form,
  passwordVisibility,
  onTogglePassword,
}: FormFieldsProps) => (
  <>
    <div className="flex gap-4 max-[520px]:flex-col">
      {/* First Name Field */}
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel className="text-card-foreground text-base font-normal capitalize">
              First Name
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                placeholder="Enter your first name"
                className="h-12"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Last Name Field */}
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel className="text-card-foreground text-base font-normal capitalize">
              Last Name
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                type="text"
                placeholder="Enter your last name"
                className="h-12"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
    
    {/* Email Field */}
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-card-foreground text-base font-normal capitalize">
            Email
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              type="email"
              placeholder="Enter your email"
              className="h-12"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    
    {/* Password Field */}
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-card-foreground text-base font-normal capitalize">
            Password
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={passwordVisibility.password ? "text" : "password"}
                placeholder="Enter your password"
                className="h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => onTogglePassword("password")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-colors"
              >
                {passwordVisibility.password ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Confirm Password Field */}
    <FormField
      control={form.control}
      name="confirmPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-card-foreground text-base font-normal capitalize">
            Confirm Password
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type={passwordVisibility.confirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                className="h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => onTogglePassword("confirmPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-colors"
              >
                {passwordVisibility.confirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);


interface SignupFormProps {
  form: ReturnType<typeof useAuthForm>['form'];
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  passwordVisibility: Record<string, boolean>;
  onTogglePassword: (fieldName: string) => void;
  isSubmitting: boolean;
  csrfToken: string;
  formRef: React.RefObject<HTMLFormElement | null>;
}

const SignupForm = ({
  form,
  onSubmit,
  passwordVisibility,
  onTogglePassword,
  isSubmitting,
  csrfToken,
  formRef,
}: SignupFormProps) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full font-['Poppins']" ref={formRef}>
      <input type="hidden" name="_csrf" value={csrfToken} />
      <FormFields 
        form={form} 
        passwordVisibility={passwordVisibility} 
        onTogglePassword={onTogglePassword} 
      />
      <AuthActions
        submitting={isSubmitting}
        submitLabel="Create account"
        altQuestion="Already have an account ?"
        altHref="/login"
        altLabel="Login"
      />
    </form>
  </Form>
); 