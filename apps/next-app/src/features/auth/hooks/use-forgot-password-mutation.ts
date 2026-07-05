"use client";

import { useMutation } from "@tanstack/react-query";
import { forgetPassword } from "@/lib/api/auth.service";
import type { ForgotPasswordPayload } from "@/lib/types/auth";

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgetPassword(payload),
  });
}

