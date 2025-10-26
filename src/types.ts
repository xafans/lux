export type Lum = {
    browser: NameVersion;
    os: NameVersion;
    deviceType: DeviceType;
    engine: string;
    userAgent: string;
    platform: string;
    source: string;
}

export type NameVersion = {
    name: string;
    version: string | null;
}

export type DeviceType = 'Mobile' | 'Tablet' | 'Desktop' | 'Unknown';

export type UserAgentData = {
    mobile: boolean;
    platform: string;
    brands: UserAgentDataBrand[];
}

export type UserAgentDataBrand = {
    brand: string;
    version: string;
}