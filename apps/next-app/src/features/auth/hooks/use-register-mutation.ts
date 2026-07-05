"use client";

import { useMutation } from "@tanstack/react-query";
import { register } from "@/lib/api/auth.service";
import type { RegisterPayload } from "@/lib/types/auth";

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
  });
}

