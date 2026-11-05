import { NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ provider: string }>;
}

export async function GET(req: Request, { params }: RouteParams) {
  const { provider } = await params;
  const { searchParams } = new URL(req.url);
  const redirectUri = `${new URL(req.url).origin}/api/auth/callback/${provider}`;

  if (provider === "google") {
    const clientId = process.env.AUTH_GOOGLE_ID;
    if (clientId) {
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;
      return NextResponse.redirect(googleAuthUrl);
    }
  }

  if (provider === "github") {
    const clientId = process.env.AUTH_GITHUB_ID;
    if (clientId) {
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&scope=read:user%20user:email`;
      return NextResponse.redirect(githubAuthUrl);
    }
  }

  // If no env credentials are set, redirect to the direct auth handler in the app with provider preset
  const targetUrl = new URL(`/auth?provider=${provider}&status=ready`, req.url);
  return NextResponse.redirect(targetUrl);
}
