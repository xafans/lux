import { UserAgentLux } from './UserAgentLux';
import { Lum } from './types';
import { UserAgentDataLux } from './UserAgentDataLux';

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
        if (!navigator) return this.UNKNOWN;

        // 1) if userAgentString is not provided, navigator.userAgentData first (on Chromium browsers)
        let result = !userAgentString && UserAgentDataLux.lum();

        // 2) fallback to navigator.userAgent
        if (!result) {
            result = UserAgentLux.lum(userAgentString || navigator.userAgent);
        }

        if (!result) return this.UNKNOWN;

        // prefer Brave API
        const brave = !!(navigator as any).brave;
        if (brave && result.browser.name === 'Chrome') {
            result.browser.name = 'Brave';
        }

        return result;
    }

    public static UNKNOWN: Lum = {
        browser: { name: 'Unknown', version: 'Unknown' },
        os: { name: 'Unknown', version: 'Unknown' },
        deviceType: 'Unknown',
        engine: 'Unknown',
        userAgent: 'Unknown',
        platform: 'Unknown',
        source: 'Unknown',
    };
}