import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ provider: string }>;
}

export async function GET(req: Request, { params }: RouteParams) {
  const { provider } = await params;
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const origin = new URL(req.url).origin;

  if (!code) {
    return NextResponse.redirect(`${origin}/auth?error=missing_code`);
  }

  try {
    let email = "";
    let name = "";
    let avatar = "";

    if (provider === "google") {
      const clientId = process.env.AUTH_GOOGLE_ID;
      const clientSecret = process.env.AUTH_GOOGLE_SECRET;
      const redirectUri = `${origin}/api/auth/callback/google`;

      const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code,
          client_id: clientId || "",
          client_secret: clientSecret || "",
          redirect_uri: redirectUri,
          grant_type: "authorization_code",
        }),
      });

      const tokenData = await tokenRes.json();
      if (tokenData.access_token) {
        const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });
        const userData = await userRes.json();
        email = userData.email || "";
        name = userData.name || userData.given_name || "Google User";
        avatar = userData.picture || "";
      }
    } else if (provider === "github") {
      const clientId = process.env.AUTH_GITHUB_ID;
      const clientSecret = process.env.AUTH_GITHUB_SECRET;

      const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      });

      const tokenData = await tokenRes.json();
      if (tokenData.access_token) {
        const userRes = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `token ${tokenData.access_token}`,
            "User-Agent": "PROTO-TCP",
          },
        });
        const userData = await userRes.json();
        email = userData.email || `${userData.login}@github.com`;
        name = userData.name || userData.login || "GitHub User";
        avatar = userData.avatar_url || "";
      }
    }

    if (email) {
      const redirectSuccess = new URL(`/auth/success?provider=${provider}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&avatar=${encodeURIComponent(avatar)}`, origin);
      return NextResponse.redirect(redirectSuccess);
    }

    return NextResponse.redirect(`${origin}/auth?error=auth_failed`);
  } catch (err) {
    console.error("OAuth callback error:", err);
    return NextResponse.redirect(`${origin}/auth?error=oauth_exception`);
  }
}
