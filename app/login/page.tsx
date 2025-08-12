"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { BackgroundElements } from "@/components/ui/background-elements";
import AuthContainer from "@/components/ui/auth-container";
import AuthHeader from "@/components/ui/auth-header";
import AuthActions from "@/components/ui/auth-actions";
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
import { loginSchema } from "@/lib/schemas";
import { useAuthForm } from "@/lib/hooks/useAuthForm";

export default function LoginPage() {
  const loginConfig = useMemo(
    () => ({
      schema: loginSchema,
      defaultValues: {
        email: "",
        password: "",
      },
      onSubmit: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      },
      passwordFields: ["password"],
      showPasswordToggle: true,
      enableSecurity: true,
    }),
    []
  );

  const {
    form,
    passwordVisibility,
    togglePasswordVisibility,
    handleSubmit,
    isSubmitting,
    csrfToken,
    formRef,
  } = useAuthForm(loginConfig);

  return (
    <PageTransition>
      <div className="min-h-screen w-full relative bg-primary overflow-hidden">
        <BackgroundElements />

        <div className="w-full max-w-[540px] mx-auto absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <AuthContainer>
            <AuthHeader title="Login to your account" />
            <LoginForm
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
              autoComplete="off"
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
          <div className="flex justify-between items-center">
            <FormLabel className="text-card-foreground text-base font-normal capitalize">
              Password
            </FormLabel>
            <Link
              href="#"
              className="text-primary dark:text-secondary text-base font-normal capitalize hover:text-secondary transition-colors"
            >
              Forgot？
            </Link>
          </div>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                autoComplete="off"
                type={passwordVisibility.password ? "text" : "password"}
                placeholder="Enter your password"
                className="h-12 pr-10"
              />
              <button
                type="button"
                onClick={() => onTogglePassword("password")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-card-foreground transition-colors"
              >
                {passwordVisibility.password ? (
                  <Eye size={20} />
                ) : (
                  <EyeOff size={20} />
                )}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);

// Form actions and form wrapper
interface LoginFormProps {
  form: ReturnType<typeof useAuthForm>['form'];
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  passwordVisibility: Record<string, boolean>;
  onTogglePassword: (fieldName: string) => void;
  isSubmitting: boolean;
  csrfToken: string;
  formRef: React.RefObject<HTMLFormElement | null>;
}

const LoginForm = ({
  form,
  onSubmit,
  passwordVisibility,
  onTogglePassword,
  isSubmitting,
  csrfToken,
  formRef,
}: LoginFormProps) => (
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 w-full font-['Poppins']"
      ref={formRef}
    >
      <input type="hidden" name="_csrf" value={csrfToken} />
      <FormFields
        form={form}
        passwordVisibility={passwordVisibility}
        onTogglePassword={onTogglePassword}
      />
      <AuthActions
        submitting={isSubmitting}
        submitLabel="Login now"
        altQuestion="Don't have an account ?"
        altHref="/signup"
        altLabel="Sign up"
      />
    </form>
  </Form>
);
