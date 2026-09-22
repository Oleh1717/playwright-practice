import * as fs from 'fs';

export function getSidFromStorageState(storageStatePath: string): string {
	const storageState = JSON.parse(fs.readFileSync(storageStatePath, 'utf8'));
	const sidCookie = storageState.cookies.find((cookie: { name: string }) => cookie.name === 'sid');

	if (!sidCookie) {
		throw new Error('sid cookie not found in storageState');
	}

	return `sid=${sidCookie.value}`;
}