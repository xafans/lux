export type Lum = {
    browser: NameVersion;
    os: NameVersion;
    deviceType: string;
    engine: string;
    userAgent: string;
    platform: string;
    source: string;
}

export type NameVersion = {
    name: string;
    version: string;
}

export type UserAgentData = {
    mobile: boolean;
    platform: string;
    brands: UserAgentDataBrand[];
}

export type UserAgentDataBrand = {
    brand: string;
    version: string;
}

export interface BraveNavigator extends Navigator {
    brave: object;
}