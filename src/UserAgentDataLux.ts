import { Lum, NameVersion, UserAgentDataBrand } from './types';

// Chromium only (not on iOS Safari)
export class UserAgentDataLux {
    static lum(): Lum | null {
        const userAgentData = navigator.userAgentData || null;
        if (!userAgentData) return null;

        // browser name/version from brand (but fine for majors)
        const brand = findBrand(userAgentData.brands || []);
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