"use server";

import authService from "@/services/authService";
import { cookies } from "next/headers";
import { tokenServiceFactory } from "@/factories/tokenServiceFactory";
import { redirect } from "next/navigation";

const tokenService = await tokenServiceFactory;

// Tipo de retorno compatível com useActionState
export type AuthenticateState = {
  error?: string;
  success?: boolean;
};

export async function authenticate(
  prevState: AuthenticateState | null,
  formData: FormData,
): Promise<AuthenticateState> {
    
  console.log("authenticate called with formData:", Object.fromEntries(formData.entries()));

  const userId = formData.get("userId") as string;
  const apiKey = formData.get("apiKey") as string;

  // Validação básica dos campos
  if (!userId || !apiKey) {
    return {
      error: "Preencha todos os campos obrigatórios (User ID e API Key).",
    };
  }

  const result = await authService.authenticate(apiKey, userId);
  
  if (!result.isSuccess) {
    console.error("Authentication failed:", result.error);
    
    // Retorna erro específico ou genérico
    const errorMessage = result.error || "Falha na autenticação. Verifique suas credenciais.";
    
    return {
      error: errorMessage,
    };
  }
    
  // Sucesso: setar cookie e redirecionar
  const cookieStore = await cookies();
  const { token } = await tokenService.generate(userId);
  
  (await cookieStore).set("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    sameSite: "lax",
  });

  console.log("Authentication successful, token set in cookie:", token);
  
  // Redirecionamento interrompe a execução - não precisa de return
  redirect("/secure/home");
  
  // Esta linha nunca é alcançada, mas TypeScript precisa
  return { success: true };
}