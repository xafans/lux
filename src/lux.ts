import { NameVersion, UserAgentData, UserAgentDataBrand, UserAgentInfo } from './types';


export class Lux {
    static parse(userAgentString?: string): UserAgentInfo {
        return parse(userAgentString);
    }
}

function parse(userAgentString?: string): UserAgentInfo {
    const nav = typeof navigator !== 'undefined' ? navigator : {} as Navigator;
    const ua = (nav.userAgent || '').trim();
    const uad = nav.userAgentData || null; // chromium only (not on iOS Safari)
    const brave = !!(nav as any).brave;

    if (!userAgentString) {
        // 1) userAgentData first (on chromium browsers)
        const fromUAD = getFromUserAgentData(uad);
        if (fromUAD) {
            // prefer Brave API
            if (brave && fromUAD.browser.name === 'Chrome') {
                fromUAD.browser.name = 'Brave';
            }
            return fromUAD;
        }
    }

    // 2) fallback to userAgent
    const fromUA = getFromUserAgent(userAgentString || ua, nav);
    if (brave && fromUA.browser.name === 'Chrome') {
        fromUA.browser.name = 'Brave';
    }
    return fromUA;
}

// ============================== userAgentData ==============================

function getFromUserAgentData(userAgentData: UserAgentData): UserAgentInfo | null {
    if (!userAgentData) return null;

    // browser name/version from brand (but fine for majors)
    let brand = findBrand(userAgentData.brands || []);
    const browser = { name: formatBrandName(brand?.brand || ''), version: brand?.version || null };

    // OS & device
    const platform = userAgentData.platform || '';
    const os = extractOsFromPlatform(platform);
    const deviceType = userAgentData.mobile ? 'Mobile' : findDeviceTypeFromOs(os.name);
    const engine = browser.name === 'Firefox'
        ? 'Gecko'
        : browser.name === 'Safari'
            ? 'WebKit'
            : 'Blink'; // Chromium family default
    const userAgent = navigator.userAgent || '';

    return {
        browser,
        os,
        deviceType,
        engine,
        userAgent,
        platform,
        source: 'userAgentData'
    };
}

function findBrand(brands: UserAgentDataBrand[]): UserAgentDataBrand {
    // Prefer recognizable brands over "Not A;Brand"
    const preferred = ["Microsoft Edge", "Opera", "Google Chrome", "Chromium"];
    for (const p of preferred) {
        const hit = brands.find(b => (b.brand || '').toLowerCase() === p.toLowerCase());
        if (hit) return hit;
    }
    // Fallback: first non-“Not” brand
    return brands.find(b => !(b.brand || '').match(/not.*brand/i)) || brands[0] || null;
}

function formatBrandName(name: string): string {
    if (/edge/i.test(name)) return "Edge";
    if (/opera/i.test(name)) return "Opera";
    if (/chrome|chromium/i.test(name)) return "Chrome";
    return name || "Unknown";
}

function extractOsFromPlatform(platform: string): NameVersion {
    switch ((platform || '').toLowerCase()) {
        case "windows": return { name: "Windows", version: null };
        case "macos": return { name: "macOS", version: null };
        case "android": return { name: "Android", version: null };
        case "ios": return { name: "iOS", version: null };
        case "chrome os":
        case "chromeos": return { name: "Chrome OS", version: null };
        case "linux": return { name: "Linux", version: null };
        default: return { name: platform || "Unknown", version: null };
    }
}

function findDeviceTypeFromOs(name: string) {
    // For human meaning, “Desktop” is fine for non-mobile platforms.
    return /android|ios/i.test(name) ? "Mobile" : "Desktop";
}

// ============================== userAgent ==============================

function getFromUserAgent(userAgent: string, nav: Navigator): UserAgentInfo {
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
    const isIPadOS13Plus = nav.platform === 'MacIntel' && (nav.maxTouchPoints || 0) > 1;
    if (/\bWindows NT\b/.test(userAgent)) {
        os.name = 'Windows';
        const m = userAgent.match(/Windows NT ([\d.]+)/);
        os.version = m ? mapWindowsVersion(m[1]) : null;
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
        (nav.platform === 'MacIntel' && (nav.maxTouchPoints || 0) > 1);
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

    const platform = nav.platform || '';

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

function mapWindowsVersion(nt: string): string {
    const map: Record<string, string> = {
        '10.0': '10/11',
        '6.3': '8.1',
        '6.2': '8',
        '6.1': '7',
        '6.0': 'Vista',
        '5.2': 'Server 2003 / XP x64',
        '5.1': 'XP',
        '5.0': '2000'
    };
    return map[nt] || nt;
}
