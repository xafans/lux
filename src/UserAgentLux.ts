import { Lum, NameVersion } from './types';

export class UserAgentLux {
    static lum(userAgent: string): Lum | null {
        if (!userAgent) return null;

        const browser: NameVersion = { name: 'Unknown', version: null };
        const rules = [ // Order matters!
            { name: 'Edge', re: /EdgA?\/([\d.]+)/ },
            { name: 'Opera', re: /OPR\/([\d.]+)/ },
            { name: 'Samsung Internet', re: /SamsungBrowser\/([\d.]+)/ },
            { name: 'Firefox', re: /(?:Firefox|FxiOS)\/([\d.]+)/ },
            { name: 'Chrome', re: /(?:Chrome|CriOS)\/([\d.]+)/ },
            { name: 'Safari', re: /Version\/([\d.]+).*Safari/ }
        ];
        for (const r of rules) {
            const m = userAgent.match(r.re);
            if (m) {
                browser.name = r.name;
                browser.version = m[1];
                break;
            }
        }
        if (/iPhone|iPad|iPod/.test(userAgent)) {
            if (/CriOS/.test(userAgent)) {
                browser.name = 'Chrome (iOS)';
            } else if (/FxiOS/.test(userAgent)) {
                browser.name = 'Firefox (iOS)';
            } else if (/EdgiOS/.test(userAgent)) {
                browser.name = 'Edge (iOS)';
            } else if (/OPiOS/.test(userAgent)) {
                browser.name = 'Opera (iOS)';
            } else if (/Safari/.test(userAgent)) {
                browser.name = 'Safari';
            }
        }

        const os: NameVersion = { name: 'Unknown', version: null };
        const isIPadOS13Plus = navigator.platform === 'MacIntel' && (navigator.maxTouchPoints || 0) > 1;
        if (/\bWindows NT\b/.test(userAgent)) {
            os.name = 'Windows';
            const m = userAgent.match(/Windows NT ([\d.]+)/);
            os.version = m ? (WINDOWS_VERSIONS_MAP[m[1]] || m[1]) : null;
        } else if (/\bAndroid\b/i.test(userAgent)) {
            os.name = 'Android';
            const m = userAgent.match(/Android (\d+(?:\.\d+)?)/i);
            os.version = m ? m[1] : null;
        } else if (/\biPhone|iPad|iPod\b/i.test(userAgent)) {
            os.name = 'iOS';
            const m = userAgent.match(/OS (\d+[_\.\d]*)/i);
            os.version = m ? m[1].replace(/_/g, '.') : null;
        } else if (isIPadOS13Plus) {
            os.name = 'iOS';
            os.version = null;
        } else if (/\bMac OS X\b/.test(userAgent)) {
            os.name = 'macOS';
            const m = userAgent.match(/Mac OS X (\d+[_\.\d]*)/);
            os.version = m ? m[1].replace(/_/g, '.') : null;
        } else if (/\bCrOS\b/.test(userAgent)) {
            os.name = 'Chrome OS';
        } else if (/\bLinux\b/.test(userAgent)) {
            os.name = 'Linux';
        }

        const isMobile = /\bMobile\b/i.test(userAgent) || /iPhone|iPod/.test(userAgent);
        const isTablet =
            /iPad/.test(userAgent) ||
            (/\bAndroid\b/i.test(userAgent) && !/\bMobile\b/i.test(userAgent)) ||
            (navigator.platform === 'MacIntel' && (navigator.maxTouchPoints || 0) > 1);
        const deviceType = isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop';

        let engine = 'Unknown';
        if (/Gecko\/\d/i.test(userAgent) && /Firefox\//i.test(userAgent)) {
            engine = 'Gecko';
        } else if (/AppleWebKit\//i.test(userAgent)) {
            engine = (/Chrome|CriOS|OPR|Edg|SamsungBrowser/.test(userAgent) && !/iPhone|iPad|iPod/.test(userAgent))
                ? 'Blink'
                : 'WebKit';
        } else if (/Trident|MSIE/.test(userAgent)) {
            engine = 'Trident';
        }

        const platform = navigator.platform || '';

        return {
            browser,
            os,
            deviceType,
            engine,
            userAgent,
            platform,
            source: 'userAgent'
        };
    }
}

const WINDOWS_VERSIONS_MAP: Record<string, string> = {
    '10.0': '10/11',
    '6.3': '8.1',
    '6.2': '8',
    '6.1': '7',
    '6.0': 'Vista',
    '5.2': 'Server 2003 / XP x64',
    '5.1': 'XP',
    '5.0': '2000'
};
