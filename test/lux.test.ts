import { describe, expect, it } from 'vitest';
import Lux from '../src';

describe('On Windows', () =>{
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
});

// describe('Lux', () => {
//     it('detects Android Chrome user agent', () => {
//         const ua = 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36 Edg/140.0.0.0';
//         const info = Lux.lum(ua);
//         expect(info.os.name).toBe('Android');
//         expect(info.os.version).toBe('13');
//         expect(info.deviceType).toBe('Mobile');
//     });

//     it('detects iPhone Safari user agent', () => {
//         const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
//         const info = Lux.lum(ua);
//         expect(info.os.name).toBe('iOS');
//         expect(info.os.version).toBe('17.0');
//         expect(info.browser.name).toBe('Safari');
//         expect(info.browser.version).toBe('17.0');
//     });

//     it('detects Windows Chrome user agent', () => {
//         const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.59 Safari/537.36';
//         const info = Lux.lum(ua);
//         expect(info.os.name).toBe('Windows');
//         expect(info.deviceType).toBe('Desktop');
//     });

//     it('returns Unknown for unrecognized UA', () => {
//         const ua = 'TotallyUnknownAgent/1.0';
//         const info = Lux.lum(ua);
//         expect(info.os.name).toBe('Unknown');
//     });
// });