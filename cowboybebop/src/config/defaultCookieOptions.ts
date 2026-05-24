// Centralized default cookie options for the entire application
// Update this file to change default cookie behavior globally

import type { CookieSerializeOptions } from "next/dist/compiled/@edge-runtime/cookies";

export const DefaultCookieOptions: CookieSerializeOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
  sameSite: "lax",
};
