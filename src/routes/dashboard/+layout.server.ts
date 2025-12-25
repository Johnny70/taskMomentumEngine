import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	const session = cookies.get('session');
	if (!session) {
		throw redirect(302, '/');
	}
	// Optionally: decode and validate session here
	return {};
};
