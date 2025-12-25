
import { json, redirect, type RequestHandler } from '@sveltejs/kit';
import { base64url } from 'jose';


const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const USERINFO_URL = 'https://openidconnect.googleapis.com/v1/userinfo';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

export const GET: RequestHandler = async ({ url, cookies, fetch }) => {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	const storedState = cookies.get('oauth_state');

	if (!code || !state || state !== storedState) {
		return json({ error: 'Invalid OAuth2 state or missing code.' }, { status: 400 });
	}

	// Exchange code for tokens

	const params = new URLSearchParams({
		code,
		client_id: CLIENT_ID!,
		client_secret: CLIENT_SECRET!,
		redirect_uri: REDIRECT_URI!,
		grant_type: 'authorization_code'
	});

	const tokenRes = await fetch(TOKEN_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: params.toString()
	});

	if (!tokenRes.ok) {
		return json({ error: 'Failed to fetch tokens from Google.' }, { status: 500 });
	}

	const tokenData = await tokenRes.json();
	const { id_token, access_token } = tokenData;

	// Get user info
	const userRes = await fetch(USERINFO_URL, {
		headers: { Authorization: `Bearer ${access_token}` }
	});

	if (!userRes.ok) {
		return json({ error: 'Failed to fetch user info from Google.' }, { status: 500 });
	}

	const user = await userRes.json();

	// Skapa session (exempel: spara i cookie)
	cookies.set('session', base64url.encode(JSON.stringify({
		email: user.email,
		name: user.name,
		picture: user.picture,
		sub: user.sub
	})), {
		path: '/',
		httpOnly: true,
		secure: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 7 // 1 vecka
	});

	// Rensa state-cookie
	cookies.delete('oauth_state', { path: '/' });

	// Skicka användaren till dashboard
	throw redirect(302, '/dashboard');
};
