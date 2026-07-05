"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { routePaths } from "@/lib/config/routes";
import { AUTH_REDIRECT_PARAM } from "@/lib/constants/auth";
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
import { useLoginMutation } from "@/features/auth/hooks/use-login-mutation";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas/auth.schemas";
import { normalizeApiError } from "@/lib/api/api-error";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  useEffect(() => {
    setFocus("identifier");
  }, [setFocus]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync(values);
      const redirectTarget =
        searchParams.get(AUTH_REDIRECT_PARAM) || routePaths.dashboard;
      router.replace(redirectTarget);
    } catch {
      // React Query already stores the error state for the form UI.
      // Swallow the rejection so the submit promise doesn't become unhandled.
    }
  });

  const errorMessage = mutation.error
    ? normalizeApiError(mutation.error).message
    : null;

  const registered = searchParams.get("registered");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Use your username or email address to access the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          {registered === "1" ? (
            <Alert variant="success">
              Registration complete. You can sign in now.
            </Alert>
          ) : null}
          {errorMessage ? <Alert variant="destructive">{errorMessage}</Alert> : null}
          <FormField
            id="identifier"
            label="Username or email"
            error={errors.identifier?.message}
          >
            <Input
              id="identifier"
              autoComplete="username"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.identifier)}
              {...register("identifier")}
            />
          </FormField>
          <FormField
            id="password"
            label="Password"
            error={errors.password?.message}
          >
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              aria-invalid={Boolean(errors.password)}
              {...register("password")}
            />
          </FormField>
          <Button className="w-full" type="submit" loading={mutation.isPending}>
            Sign in
          </Button>
        </form>
      </CardContent>
      <CardFooter className="justify-between gap-3 border-t border-slate-200 pt-6">
        <p className="text-sm text-slate-600">Need an account?</p>
        <Link
          href={routePaths.register}
          className="text-sm font-medium text-slate-950 underline-offset-4 hover:underline"
        >
          Create one
        </Link>
      </CardFooter>
    </Card>
  );
}
