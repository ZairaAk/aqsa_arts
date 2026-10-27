"use server";

import { createHash, timingSafeEqual } from "crypto";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/lib/auth/session";

export type LoginState = { error: string } | undefined;

function safeCompare(a: string, b: string) {
  const digestA = createHash("sha256").update(a).digest();
  const digestB = createHash("sha256").update(b).digest();
  return timingSafeEqual(digestA, digestB);
}

export async function login(
  _state: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const validUsername = process.env.ADMIN_USERNAME;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (!validUsername || !validPassword) {
    return { error: "Admin credentials are not configured on the server." };
  }

  if (!process.env.SESSION_SECRET) {
    return { error: "Admin sessions are not configured on the server." };
  }

  const usernameMatches = safeCompare(username, validUsername);
  const passwordMatches = safeCompare(password, validPassword);
  if (!usernameMatches || !passwordMatches) {
    return { error: "Invalid username or password." };
  }

  try {
    await createSession(username);
  } catch (error) {
    console.error("Failed to create admin session:", error);
    return { error: "Unable to start an admin session. Please try again later." };
  }

  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
