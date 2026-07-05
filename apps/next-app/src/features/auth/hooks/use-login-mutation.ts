"use client";

import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api/auth.service";
import type { LoginPayload } from "@/lib/types/auth";

export function useLoginMutation() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
  });
}

