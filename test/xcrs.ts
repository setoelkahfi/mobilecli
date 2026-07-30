import { execFileSync } from 'child_process';
import { existsSync } from 'fs';

export type XcrsIosAppTestEnv = {
	xcrsPath: string;
	appPath: string;
	bundleId: string;
	simulatorName: string;
};

export function getXcrsIosAppTestEnv(): XcrsIosAppTestEnv | undefined {
	const xcrsPath = process.env.XCRS_PATH;
	const appPath = process.env.XCRS_IOS_TEST_APP_PATH;
	const bundleId = process.env.XCRS_IOS_TEST_BUNDLE_ID;

	if (!xcrsPath || !appPath || !bundleId) {
		return undefined;
	}

	if (!existsSync(xcrsPath)) {
		throw new Error(`XCRS_PATH does not exist: ${xcrsPath}`);
	}

	if (!existsSync(appPath)) {
		throw new Error(`XCRS_IOS_TEST_APP_PATH does not exist: ${appPath}`);
	}

	return {
		xcrsPath,
		appPath,
		bundleId,
		simulatorName: process.env.XCRS_IOS_TEST_SIMULATOR_NAME || 'Test-iOS-26',
	};
}

export function runXcrsJson(env: XcrsIosAppTestEnv, args: string[]): any {
	const output = execFileSync(env.xcrsPath, [...args, '--json'], {
		encoding: 'utf8',
		timeout: 180000,
		stdio: ['pipe', 'pipe', 'pipe'],
	});
	return JSON.parse(output);
}
