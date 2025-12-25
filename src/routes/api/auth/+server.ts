import type { RequestHandler } from '@sveltejs/kit';
import { json, redirect } from '@sveltejs/kit';

// TODO: Replace with your actual Google OAuth2 credentials
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5173/api/auth/callback';
const SCOPE = 'openid email profile';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const state = crypto.randomUUID();
	cookies.set('oauth_state', state, { path: '/', httpOnly: true, sameSite: 'lax' });
	const params = new URLSearchParams({
		client_id: CLIENT_ID!,
		redirect_uri: REDIRECT_URI!,
		response_type: 'code',
		scope: SCOPE,
		state
	});
	return redirect(302, `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
};
