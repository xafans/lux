import { extractFromUserAgent } from './fromUserAgent';
import { extractFromUserAgentData } from './fromUserAgentData';
import { LuxInfo } from './types';

/** 
 * Extracts browser, OS, device type, engine, and user agent information.
 */
export class Lux {
    /**
     * Extract LuxInfo from user agent string or navigator object.
     * @param userAgentString Optional user agent string to parse. If not provided, will use navigator.userAgentData or navigator.userAgent.
     * @returns LuxInfo object with parsed information.
     */
    static extract(userAgentString?: string): LuxInfo {
        if (!navigator) return this.UNKNOWN;

        // 1) if userAgentString is not provided, navigator.userAgentData first (on Chromium browsers)
        let result = !userAgentString && extractFromUserAgentData();

        // 2) fallback to navigator.userAgent
        if (!result) {
            result = extractFromUserAgent(userAgentString || navigator.userAgent);
        }

        // prefer Brave API
        const brave = !!(navigator as any).brave;
        if (brave && result.browser.name === 'Chrome') {
            result.browser.name = 'Brave';
        }

        return result || this.UNKNOWN;
    }

    public static UNKNOWN: LuxInfo = {
        browser: { name: 'unknown', version: 'unknown' },
        os: { name: 'unknown', version: 'unknown' },
        deviceType: 'unknown',
        engine: 'unknown',
        userAgent: 'unknown',
        platform: 'unknown',
        source: 'unknown',
    };
}