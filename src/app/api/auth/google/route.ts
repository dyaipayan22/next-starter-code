import { generateState, generateCodeVerifier } from "arctic";
import { cookies } from "next/headers";
import { google } from "@/lib/auth";
import { env } from "@/env";

export async function GET() {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const authorizationUrl = await google.createAuthorizationURL(
    state,
    codeVerifier,
    { scopes: ["profile", "email"] }
  );

  cookies().set("google_oauth_state", state, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });

  cookies().set("google_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });

  return Response.redirect(authorizationUrl);
}
