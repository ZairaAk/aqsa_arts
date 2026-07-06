"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/auth-actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    undefined
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal px-6">
      <div className="w-full max-w-sm rounded-sm border border-gold/20 bg-ivory p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Aqsa Arts</p>
        <h1 className="mt-2 font-display text-2xl text-charcoal">Admin Login</h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Sign in to access the admin dashboard.
        </p>

        <form action={formAction} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="username"
              className="text-xs uppercase tracking-wide text-charcoal/70"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="rounded-sm border border-charcoal/20 bg-white px-3 py-2 text-sm outline-none focus:border-gold"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-xs uppercase tracking-wide text-charcoal/70"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="rounded-sm border border-charcoal/20 bg-white px-3 py-2 text-sm outline-none focus:border-gold"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-sm bg-charcoal px-4 py-2 text-sm uppercase tracking-wide text-ivory transition hover:bg-gold disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
