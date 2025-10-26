import { describe, expect, it } from 'vitest';
import Lux from '../src';

describe('Lux', () => {
    it('detects Android Chrome user agent', () => {
        const ua = 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36 Edg/140.0.0.0';
        const info = Lux.lum(ua);
        expect(info.os.name).toBe('Android');
        expect(info.os.version).toBe('13');
        expect(info.deviceType).toBe('Mobile');
    });

    it('detects iPhone Safari user agent', () => {
        const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
        const info = Lux.lum(ua);
        expect(info.os.name).toBe('iOS');
        expect(info.os.version).toBe('17.0');
        expect(info.browser.name).toBe('Safari');
        expect(info.browser.version).toBe('17.0');
    });

    it('detects Windows Chrome user agent', () => {
        const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.59 Safari/537.36';
        const info = Lux.lum(ua);
        expect(info.os.name).toBe('Windows');
        expect(info.deviceType).toBe('Desktop');
    });

    it('returns Unknown for unrecognized UA', () => {
        const ua = 'TotallyUnknownAgent/1.0';
        const info = Lux.lum(ua);
        expect(info.os.name).toBe('Unknown');
    });
});