"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { routePaths } from "@/lib/config/routes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/common/form-field";
import { useRegisterMutation } from "@/features/auth/hooks/use-register-mutation";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas/auth.schemas";
import { normalizeApiError } from "@/lib/api/api-error";

export function RegisterForm() {
  const router = useRouter();
  const mutation = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync(values);
      router.replace(`${routePaths.login}?registered=1`);
    } catch {
      // Keep the rejected promise from bubbling into the browser console.
    }
  });

  const errorMessage = mutation.error
    ? normalizeApiError(mutation.error).message
    : null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>
          Register to start using the protected area of the app.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          {errorMessage ? <Alert variant="destructive">{errorMessage}</Alert> : null}
          <FormField id="username" label="Username" error={errors.username?.message}>
            <Input
              id="username"
              autoComplete="username"
              placeholder="opsy"
              aria-invalid={Boolean(errors.username)}
              {...register("username")}
            />
          </FormField>
          <FormField id="email" label="Email address" error={errors.email?.message}>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
          </FormField>
          <FormField id="password" label="Password" error={errors.password?.message}>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
            />
          </FormField>
          <FormField
            id="confirmPassword"
            label="Confirm password"
            error={errors.confirmPassword?.message}
          >
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              aria-invalid={Boolean(errors.confirmPassword)}
              {...register("confirmPassword")}
            />
          </FormField>
          <Button className="w-full" type="submit" loading={mutation.isPending}>
            Create account
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-between gap-3 border-t border-slate-200 pt-6">
        <p className="text-sm text-slate-600">Already have an account?</p>
        <Link
          href={routePaths.login}
          className="text-sm font-medium text-slate-950 underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </CardFooter>
    </Card>
  );
}
