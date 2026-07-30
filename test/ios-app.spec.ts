import { test, expect } from '@playwright/test';
import { getXcrsIosAppTestEnv, runXcrsJson } from './xcrs';

test.describe('iOS app E2E via xcrs', () => {
	const xcrsEnv = getXcrsIosAppTestEnv();

	test('installs and launches a simulator app through the xcrs Xcode tools abstraction', () => {
		if (!xcrsEnv) {
			test.skip(true, 'requires XCRS_PATH, XCRS_IOS_TEST_APP_PATH, and XCRS_IOS_TEST_BUNDLE_ID');
			return;
		}

		const result = runXcrsJson(xcrsEnv, [
			'ios-app-test',
			'--simulator-name',
			xcrsEnv.simulatorName,
			'--app-path',
			xcrsEnv.appPath,
			'--bundle-id',
			xcrsEnv.bundleId,
		]);

		expect(result.bundle_id).toBe(xcrsEnv.bundleId);
		expect(result.simulator.name).toBe(xcrsEnv.simulatorName);
		expect(result.app_container_path).toContain('.app');
	});
});
