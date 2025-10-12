export interface UserAgentInfo {
    browser: NameVersion;
    os: NameVersion;
    deviceType: DeviceType;
    engine: string;
    userAgent: string;
    platform: string;
    source: string;
}

export interface NameVersion {
    name: string;
    version: string | null;
}

export type DeviceType = 'Mobile' | 'Tablet' | 'Desktop';

export interface UserAgentData {
    brands: UserAgentDataBrand[];
    mobile: boolean;
    platform: string;
}

export interface UserAgentDataBrand {
    brand: string;
    version: string;
}