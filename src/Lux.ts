import { BraveNavigator, Lum } from './types';
import { UserAgentDataLux } from './UserAgentDataLux';
import { UserAgentLux } from './UserAgentLux';

/** 
 * Extracts browser, OS, device type, engine, and user agent information.
 */
export class Lux {
    /**
     * Illuminates client device info from user agent string or navigator object.
     * @param userAgentString Optional user agent string to decipher. If not provided, the navigator.userAgentData or navigator.userAgent will be used.
     * @returns A Lum object with extracted information.
     */
    static lum(userAgentString?: string): Lum {
        if (!navigator) return this.UNKNOWN_LUM;

        // 1) if userAgentString is not provided, navigator.userAgentData first (on Chromium browsers)
        let result = !userAgentString && UserAgentDataLux.lum();

        // 2) fallback to navigator.userAgent
        if (!result) {
            result = UserAgentLux.lum(userAgentString || navigator.userAgent);
        }

        if (!result) return this.UNKNOWN_LUM;

        // prefer Brave API
        const brave = !!(navigator as BraveNavigator).brave;
        if (brave && result.browser.name === 'Chrome') {
            result.browser.name = 'Brave';
        }

        return result;
    }

    public static UNKNOWN = 'Unknown';

    public static UNKNOWN_LUM: Lum = {
        browser: { name: Lux.UNKNOWN, version: Lux.UNKNOWN },
        os: { name: Lux.UNKNOWN, version: Lux.UNKNOWN },
        deviceType: Lux.UNKNOWN,
        engine: Lux.UNKNOWN,
        userAgent: Lux.UNKNOWN,
        platform: Lux.UNKNOWN,
        source: Lux.UNKNOWN,
    };
}