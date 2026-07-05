export const routePaths = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
} as const;

export const authRoutePaths = [routePaths.login, routePaths.register] as const;
export const protectedRoutePrefixes = [routePaths.dashboard] as const;

