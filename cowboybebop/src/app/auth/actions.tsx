"use server";

import { AuthResult } from "@/entities/types/auth";
import { ResultState } from "@/entities/types/baseResult";
import authService from "@/services/authService";
import { cookies } from "next/headers";
import { tokenServiceFactory } from "@/factories/tokenServiceFactory";
import { redirect } from "next/navigation";

const tokenService = await tokenServiceFactory;

export async function authenticate(
  formData: FormData,
): Promise<ResultState<AuthResult>> {
    
  const cookieStore = cookies();

  console.log("authenticate called with formData:", Object.fromEntries(formData.entries()));

  const userId = formData.get("userId") as string;
  const apiKey = formData.get("apiKey") as string;

  const result = await authService.authenticate(apiKey, userId);
  if (!result.isSuccess){
    console.error("Authentication failed:", result.error);
    return {
      statusCode: result.statusCode,
      error: result.error,
      isSuccess: false,
    };
  }
    
  const { token } = await tokenService.generate(userId);
  (await cookieStore).set("authToken", token);

  console.log("Authentication successful, token set in cookie:", token);
  redirect("/secure/home");
}