"use client"

import { useEffect, useState } from 'react';
import { authenticate } from './actions';
import { ResultState } from "@/entities/types/baseResult";
import { AuthResult } from "@/entities/types/auth";
import { BaseLoading } from "@/components/loading";

export default function AuthForm() {
    
    return (
        <form
          action={authenticate}
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
              className="rounded-md px-4 py-2 bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
              className="rounded-md px-4 py-2 bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-zinc-50 font-semibold text-base shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-zinc-900 mt-2"
          >
            Entrar
          </button>
        </form>
    )
}