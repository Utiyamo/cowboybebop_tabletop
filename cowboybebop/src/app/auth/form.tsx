"use client";

import { useActionState } from "react";
import { authenticate, AuthenticateState } from "./actions";
import { AlertCircle } from "lucide-react";

const initialState: AuthenticateState = {
  error: undefined,
  success: false,
};

export default function AuthForm() {
  const [state, formAction, isPending] = useActionState(
    authenticate,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-zinc-950 rounded-xl shadow-lg p-6 flex flex-col gap-6 border border-zinc-800"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="userId" className="text-zinc-200 font-medium">
          User ID
        </label>
        <input
          id="userId"
          name="userId"
          type="text"
          disabled={isPending}
          className="rounded-md px-4 py-2 bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
          required
          autoComplete="username"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="apiKey" className="text-zinc-200 font-medium">
          User Key
        </label>
        <input
          id="apiKey"
          name="apiKey"
          type="password"
          disabled={isPending}
          className="rounded-md px-4 py-2 bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
          required
          autoComplete="current-password"
        />
      </div>

      {/* Mensagem de erro */}
      {state?.error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-900/20 border border-red-800/50 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-zinc-50 font-semibold text-base shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-zinc-900 mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-500"
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Entrando...
          </span>
        ) : (
          "Entrar"
        )}
      </button>
    </form>
  );
}
