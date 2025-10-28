import { describe, expect, it } from 'vitest';
import Lux from '../src';

describe('Lux', () => {
    it('detects Android Chrome user agent', () => {
        const ua = 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36 Edg/140.0.0.0';
        const lum = Lux.lum(ua);
        expect(lum.os.name).toBe('Android');
        expect(lum.os.version).toBe('13');
        expect(lum.deviceType).toBe('Mobile');
    });

    it('detects iPhone Safari user agent', () => {
        const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
        const lum = Lux.lum(ua);
        expect(lum.os.name).toBe('iOS');
        expect(lum.os.version).toBe('17.0');
        expect(lum.browser.name).toBe('Safari');
        expect(lum.browser.version).toBe('17.0');
    });

    it('detects Windows Chrome user agent', () => {
        const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.59 Safari/537.36';
        const lum = Lux.lum(ua);
        expect(lum.os.name).toBe('Windows');
        expect(lum.deviceType).toBe('Desktop');
    });

    it('returns Unknown for unrecognized UA', () => {
        const ua = 'TotallyUnknownAgent/1.0';
        const lum = Lux.lum(ua);
        expect(lum.os.name).toBe(Lux.UNKNOWN);
    });
});

describe('On Windows', () => {
    // Chrome
    it('should detect Chrome 131 on Windows 10', () => {
        const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Chrome');
        expect(lum.browser.version).toBe('131.0.0.0');
        expect(lum.os.name).toBe('Windows');
        expect(lum.os.version).toBe('10/11');
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Blink');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });

    it('should detect Chrome 121 on Windows 11', () => {
        const ua = 'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.6167.140 Safari/537.36';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Chrome');
        expect(lum.browser.version).toBe('121.0.6167.140');
        expect(lum.os.name).toBe('Windows');
        expect(lum.os.version).toBe('11');
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Blink');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });

    it('should detect Chrome 90 on Windows 7', () => {
        const ua = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Chrome');
        expect(lum.browser.version).toBe('90.0.4430.212');
        expect(lum.os.name).toBe('Windows');
        expect(lum.os.version).toBe('7');
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Blink');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });

    // Edge
    it('should detect Edge 131 on Windows 11', () => {
        const ua = 'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.2903.51';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Edge');
        expect(lum.browser.version).toBe('131.0.2903.51');
        expect(lum.os.name).toBe('Windows');
        expect(lum.os.version).toBe('11');
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Blink');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });

    it('should detect Edge 118 on Windows 10', () => {
        const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.5993.90 Safari/537.36 Edg/118.0.2088.57';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Edge');
        expect(lum.browser.version).toBe('118.0.2088.57');
        expect(lum.os.name).toBe('Windows');
        expect(lum.os.version).toBe('10/11');
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Blink');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });

    it('should detect Edge 79 on Windows 10', () => {
        const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36 Edg/79.0.309.43';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Edge');
        expect(lum.browser.version).toBe('79.0.309.43');
        expect(lum.os.name).toBe('Windows');
        expect(lum.os.version).toBe('10/11');
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Blink');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });

    // Firefox
    it('should detect Firefox 131 on Windows 11', () => {
        const ua = 'Mozilla/5.0 (Windows NT 11.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Firefox');
        expect(lum.browser.version).toBe('131.0');
        expect(lum.os.name).toBe('Windows');
        expect(lum.os.version).toBe('11');
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Gecko');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });

    it('should detect Firefox 120 on Windows 10', () => {
        const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Firefox');
        expect(lum.browser.version).toBe('120.0');
        expect(lum.os.name).toBe('Windows');
        expect(lum.os.version).toBe('10/11');
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Gecko');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });

    it('should detect Firefox ESR on Windows 10', () => {
        const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:115.0) Gecko/20100101 Firefox/115.0';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Firefox');
        expect(lum.browser.version).toBe('115.0');
        expect(lum.os.name).toBe('Windows');
        expect(lum.os.version).toBe('10/11');
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Gecko');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });

    // Opera
    it('should detect Opera 103 on Windows 10', () => {
        const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 OPR/103.0.4928.59';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Opera');
        expect(lum.browser.version).toBe('103.0.4928.59');
        expect(lum.os.name).toBe('Windows');
        expect(lum.os.version).toBe('10/11');
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Blink');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });

    it('should detect Opera 74 on Windows 10', () => {
        const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 OPR/74.0.3911.75';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Opera');
        expect(lum.browser.version).toBe('74.0.3911.75');
        expect(lum.os.name).toBe('Windows');
        expect(lum.os.version).toBe('10/11');
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Blink');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });

    // Brave
    it('should detect Brave 131 on Windows 10', () => {
        const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Brave/131';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Brave');
        expect(lum.browser.version).toBe('131');
        expect(lum.os.name).toBe('Windows');
        expect(lum.os.version).toBe('10/11');
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Blink');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });
});

describe('On macOS', () => {
    // Safari
    it('should detect Safari on macOS', () => {
        const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6_0) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Safari');
        expect(lum.browser.version).toBe('18.0');
        expect(lum.os.name).toBe('macOS');
        expect(lum.os.version).toBe('14.6.0');
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('WebKit');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });

    // Chrome
    it('should detect Chrome on macOS', () => {
        const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Chrome');
        expect(lum.browser.version).toBe('131.0.0.0');
        expect(lum.os.name).toBe('macOS');
        expect(lum.os.version).toBe('14.6.1');
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Blink');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });

    // Firefox
    it('should detect Firefox on macOS', () => {
        const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13.6; rv:131.0) Gecko/20100101 Firefox/131.0';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Firefox');
        expect(lum.browser.version).toBe('131.0');
        expect(lum.os.name).toBe('macOS');
        expect(lum.os.version).toBe('13.6');
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Gecko');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });

    // Edge
    it('should detect Edge on macOS', () => {
        const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.2903.51';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Edge');
        expect(lum.browser.version).toBe('131.0.2903.51');
        expect(lum.os.name).toBe('macOS');
        expect(lum.os.version).toBe('14.5');
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Blink');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });

    // Brave
    it('should detect Brave on macOS', () => {
        const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Brave/131';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Brave');
        expect(lum.browser.version).toBe('131');
        expect(lum.os.name).toBe('macOS');
        expect(lum.os.version).toBe('14.5.1');
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Blink');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });
});

describe('On Linux', () => {
    // Chrome
    it('should detect Chrome on Linux', () => {
        const ua = 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Chrome');
        expect(lum.browser.version).toBe('131.0.0.0');
        expect(lum.os.name).toBe('Linux');
        expect(lum.os.version).toBe(Lux.UNKNOWN);
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Blink');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });

    // Firefox
    it('should detect Firefox on Linux', () => {
        const ua = 'Mozilla/5.0 (X11; Debian; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0';
        const lum = Lux.lum(ua);
        expect(lum.browser.name).toBe('Firefox');
        expect(lum.browser.version).toBe('131.0');
        expect(lum.os.name).toBe('Linux');
        expect(lum.os.version).toBe(Lux.UNKNOWN);
        expect(lum.deviceType).toBe('Desktop');
        expect(lum.engine).toBe('Gecko');
        expect(lum.platform).toBe('');
        expect(lum.source).toBe('userAgent');
        expect(lum.userAgent).toBe(ua);
    });
});

describe('TEST', () => {
    it('TEST', () => {
        const ua = 'Mozilla/5.0 (Windows 12 Pro; 64-bit) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36';
        const lum = Lux.lum(ua);
        console.log(lum)
    });
});
