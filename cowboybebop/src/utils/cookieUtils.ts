// Pure utility functions for cookie read/write using Next.js API
// Always use DefaultCookieOptions as base for writing

import type { RequestCookies, ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { DefaultCookieOptions } from "@/config/defaultCookieOptions";

export function setCookie(
  cookiesObj: ResponseCookies,
  name: string,
  value: string,
  options: Partial<Parameters<ResponseCookies["set"]>[2]> = {}
) {
  cookiesObj.set(name, value, { ...DefaultCookieOptions, ...options });
}

export function getCookie(
  cookiesObj: RequestCookies | ResponseCookies,
  name: string
): string | undefined {
  return cookiesObj.get(name)?.value;
}
